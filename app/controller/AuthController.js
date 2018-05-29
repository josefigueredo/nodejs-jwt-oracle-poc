'use strict'

const oracledb = require('oracledb')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const cnxProvider = require("../dao/ConnectionProvider")
var VerifyToken = require('../middleware/VerifyToken')

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../../config/')

function doLogin(request, response) {

    const sql = "SELECT * " +
                "  FROM poc_micro_01 " +
                " WHERE email = :email"
    cnxProvider.open(sql, [request.body.email], false, oracledb.OBJECT, response, (result) => {
    response.contentType('application/json').status(200)

        if(result.rows == 0 ) return response.status(404).send('No user found.')

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(request.body.password, result.rows[0].PASSWORD)  // Convertir a json obj
        if (!passwordIsValid) return response.status(401).send({ auth: false, token: null })

        // si encontre el usuario y el password es valido
        // crea token
        var token = jwt.sign({ id: result.rows[0][0] }, config.secret, {
          expiresIn: 86400 // expira en 24 horas
        })

        response.status(200).send({ auth: true, token: token }) 
    }, (error) => {
        return res.status(500).send('Error on the server.')
    })
}


function doLogout(req, res) {
  res.status(200).send({ auth: false, token: null });
}


function showMe(req, res) {

  var token = req.headers['x-access-token']
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' })
  
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) return res.status(500).send("There was a problem finding the user.")
    
    return res.status(200).send(decoded)
  })
}


function doRegister(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const sql = " INSERT " +
              "   INTO poc_micro_01 " +
              " VALUES (:id, :name, :email, :password) "
  cnxProvider.open(sql, [req.body.id, req.body.name, req.body.email, req.body.password], true, oracledb.OBJECT, res, (result) => {
      // si el usuario se registra sin errores
      // crear token
      var token = jwt.sign({ id: req.body.id }, config.secret, {
        expiresIn: 86400 // expira en 24 horas
      });

      res.status(200).send({ auth: true, token: token });
  }, (error) => {
    return res.status(500).send("There was a problem registering the user.");
  })
}

module.exports = {
  doLogin,
  doLogout,
  showMe,
  doRegister
}