const mongoose = require('mongoose')

const templateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    catergory: {type: mongoose.Schema.Types.ObjectId, ref:"Catergory"},
    duration: {
      type: String,
      required: true,
    }
  })
  
  module.exports = mongoose.model('Templates', templateSchema)