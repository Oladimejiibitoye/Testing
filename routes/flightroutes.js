const Router = require('express').Router();


const flightController = require('../controllers/flightController');
const isAuth = require('../middleware/is-auth')


//routes
Router.post('/addflighthistory', isAuth, flightController.addFlightHistory);

module.exports = Router