'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var api  = require(__root + "./app/routes")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)

module.exports = app