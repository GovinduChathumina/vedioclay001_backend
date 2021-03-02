require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
const templateRouter = require('./routes/templates')
app.use('/templates', templateRouter)
const catergoryRouter = require('./routes/catergories')
app.use('/catergories', catergoryRouter)

app.listen(8080, () => console.log('Server Started'))