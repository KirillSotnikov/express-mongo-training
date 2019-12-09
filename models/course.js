const {model, Schema} = require('mongoose')

const course = new Schema({
  name:{
    type:String,
    required: true
  },
  price:{
    type:String,
    required: true
  },
  url: String
})

module.exports = model('Course', course)