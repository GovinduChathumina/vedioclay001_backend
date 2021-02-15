const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    templates:[{
        Template_id: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Templates'},
        _id:false
      }],
  })
  
  module.exports = mongoose.model('Catergory', categorySchema)