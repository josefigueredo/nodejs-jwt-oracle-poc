'use strict'

const express = require('express')
const authCtrl = require('../controller/AuthController')
const authMW = require('../middleware/VerifyToken')
const api = express.Router()

//TODO : change the input from form to json

/**
 * @api {get} /register/ Register a system
 * @apiVersion 0.0.1
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} id       system id.
 * @apiSuccess {String} name     system name.
 * @apiSuccess {String} email    system email.
 * @apiSuccess {String} password system password.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "auth": true,
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE1MjM5MTE5NjEsImV4cCI6MTUyMzk5ODM2MX0.UbOISVeKCBdA5S7rPw-0UHVmhVGWr3zpRuLpbEq2wOw"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
api.post('/register', authCtrl.doRegister)
api.post('/login', authCtrl.doLogin)
api.get('/me', authCtrl.showMe)

// Example of an authenticaded API route:
// api.get('/all/', authMW, someController.someOperationThatNeedsAuth)

module.exports = api