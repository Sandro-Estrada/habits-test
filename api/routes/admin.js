'use strict'

const express = require('express')
const AdminController = require('../controllers/admin')
const { adminMiddleware: { validateAdminParams } } = require('../middlewares')
const api = express.Router()

api.post('/', [validateAdminParams], AdminController.create)
api.post('/login', AdminController.login)

module.exports = api
