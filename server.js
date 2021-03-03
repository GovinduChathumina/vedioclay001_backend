require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')

// var corsOptions = {
//     origin: "https://vedioclay-001-o6obi.ondigitalocean.app"
//   };
  
//   app.use(cors(corsOptions));
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
      return res.status(200).json({
        message: "it works"
      });
    }
    next();
  });
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

app.listen(8081, () => console.log('Server Started'))