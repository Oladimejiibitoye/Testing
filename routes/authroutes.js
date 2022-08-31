const Router = require('express').Router();


const authController = require('../controllers/authController');


//routes
Router.post('/signup', authController.SignUp);
Router.patch('/sendotp/:userId', authController.SendOTP);
Router.post('/emailverification', authController.EmailVerification);
Router.post('/signin', authController.SignIn);

module.exports = Router