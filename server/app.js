const express = require('express')
var cors = require('cors')
const app = express()
const { Module } = require('configs/Module')

//init all module
const mod = new Module(app)
mod.bodyParser()
mod.dotenv()
mod.template()
mod.assets()
mod.morgan()
app.use(cors())

module.exports = { app }
