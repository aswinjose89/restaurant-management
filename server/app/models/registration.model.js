const { Module } = require('configs/Module')
const mongoose = new Module().mongoose()


const setMenuSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  itemName: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    trim: true,
    required: true
  },
  availability: {
    type: String,
    trim: true,
    required: true
  },
  rating: {
    type: Number,
    trim: true,
    default: 0
  },
  total_user_rating: {
    type: Number,
    trim: true,
    default: 0
  },
  average_rating: {
    type: Number,
    trim: true,
    default: 0
  }
},
{
    timestamps: true
})

const setRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique : true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  number: {
    type: String,
    trim: true,
    required: true
  },
  rating: {
    type: Number,
    trim: true,
    default: 0
  },
  total_user_rating: {
    type: Number,
    trim: true,
    default: 0
  },
  average_rating: {
    type: Number,
    trim: true,
    default: 0
  },
  menus: [setMenuSchema]
},
{
    timestamps: true
})

const registrationSchema = mongoose.model('registration', setRegistrationSchema)
module.exports = { registrationSchema }