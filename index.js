'use strict'

global.__root   = __dirname + '/'
const app = require(__root + './app')
const config = require(__root + './config')

app.listen(config.port, () => {
    console.log('Live from New York, it\'s Saturday Night!')
    console.log('API REST corriendo en http://localhost:' + config.port)
})