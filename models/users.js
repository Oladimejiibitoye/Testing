const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const userSchema = new Schema({

  business_name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  owner_name: {
    type: String,
    trim: true,
    required: true,
  },
  business_category: {
    type: String,
    required: true,
    trim: true,
  },
  
  email: {
    type: String,
    validate:{
      validator:function(email){
          return validate.isEmail(email)
      },
      message:"Sorry Invalid email Address"
  },
    unique: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    min: 8,
    max: 64,
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpired: {
    type: Date,
    default: null
  },
  phone_number: {
    type: Number,
    trim: true,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
    required: true
  },
},
{ timestamps: true }
)

  // hash password before save user doc

userSchema.pre('save', async function(next){

  if(!this.isModified('password')) return next()
   
   this.password = await bcrypt.hash(this.password,12);
   
   next()
 
 })
 
 userSchema.methods.comparePasswords = async (newPassword,originalPassword) => await bcrypt.compare(newPassword,originalPassword);


 module.exports = mongoose.model('User', userSchema);