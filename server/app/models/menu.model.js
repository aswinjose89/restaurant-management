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
  }
},
{
    timestamps: true
})

const menuSchema = mongoose.model('menu', setMenuSchema)
module.exports = { menuSchema }