const Flight = require('../models/flight');

exports.addFlightHistory = async (req, res, next) => {
  const { name, number, cost_of_flight, sellingprice_of_flight, duration } =  req.body;
  const flight = new Flight({
    name: name,
    number: number,
    cost_of_flight: cost_of_flight,
    selling_price_of_flight: sellingprice_of_flight,
    duration: duration,
    userId: req.userId
  })
  await flight.save()
  return res.status(201).json({
    "message": "flight successfully created",
    "product": flight
  })
}