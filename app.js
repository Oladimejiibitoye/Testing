const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimiter = require('express-rate-limit')
const cors = require('cors')
require('dotenv').config()


const app = express();


app.use(bodyParser.json()) // for parsing json data

const uri = process.env.ATLAS_URI
const port = process.env.PORT || 4000;

// require routes
const authRoutes = require('./routes/authroutes');
const flightRoutes = require('./routes/flightroutes');
const storeRoutes = require('./routes/storeroutes');

app.use(cors());

app.use('/api', rateLimiter({
  max:100  ,
  windowMs: 60 * 60 * 1000,
  message:"Req limit reached try again in an hour"
}));

// base route
app.use('/api/v1/flight', flightRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1/store', storeRoutes)



app.get('/', (req, res) => {
  console.log('l reached here')
  res.status(200).send({
      status: "success",
      data: {
          message: "API working fine"
      }
  });
});

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB Database connection established successfully');
  app.listen(port, () => {
    console.log(`listening at ${port}`)
  })
})
