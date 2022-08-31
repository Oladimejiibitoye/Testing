const User = require('../models/users');
const jwt = require('jsonwebtoken');


// helper function for signing JWT tokens and sending them
const signJwtToken = (res,user,statusCode)=>{
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn : process.env.EXPIRY_DATE
  })
  
     res.status(statusCode).json({
          "message": "Success",
           user,
           token
      })

}

exports.SignUp = async (req, res, next) => {
  const {
    business_name,
    owner_name,
    business_category,
    phone_number,
    email,
    password,
  } = req.body;

  const existingUser = await User.findOne({email: email});

  if(existingUser) 
    return res.status(400).json({
      'message': 'User already exists'
    });
  
  const user = new User( {
    business_name: business_name,
    owner_name: owner_name,
    business_category: business_category,
    phone_number: phone_number,
    email: email,
    password: password
  });

  await user.save();
  signJwtToken(res,user,201)


}

exports.SendOTP = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if(!user){
    return res.status(404).json({
      'message': 'User not found'
    })
  }
  const otp = Math.floor(100000 + Math.random() * 900000);// generate 6 digit otp
  const otpExpired = Date.now() + 10 * 60 * 1000 // otp expires in 5 minutes
  user.otp = otp;
  user.otpExpired = otpExpired;
  await user.save();
  return res.status(201).json({
    'message': 'OTP sent to user email',
    'OTP': otp
  })
}

exports.EmailVerification = async(req, res, next) => {
  const { otp } = req.body;
  const user = await User.findOne({otp: otp, otpExpired: {$gt:Date.now()} });

  if(!user){
    return res.status(400).json({
      'message': 'Invalid OTP'
    })
  }
  
  user.isEmailVerified = true;
  await user.save();
  return res.status(201).json({
    'message': 'Email verification successful'
  })
}

exports.SignIn = async (req, res, next) => {
  const {email, password} = req.body
  // check if there is an email and password 
  if(!email || !password) 
    return res.status(400).json({
      'message': "please include an email and password"
    });

  //find the user with that email and confirm the password is the same as
  const userWithEmail = await User.findOne({email: email}).select('+password')

  //if the password isnt correct return error .if it is send a jwt token to the client 
  if(!userWithEmail || !(await userWithEmail.comparePasswords(password,userWithEmail.password))){   
    return res.status(400).json({
      'message': "you have entered an incorrect email or password"
    });
  };

  //check if email is verified
  if(!userWithEmail.isEmailVerified)
    return res.status(400).json({
      'message': "please verify email address"
    });

    signJwtToken(res,userWithEmail,201)
}