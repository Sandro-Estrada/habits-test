'use strict'

const express = require('express')
const MedicamentController = require('../controllers/medicament')
const {
    medicamentMiddleware: {
        validateMedicamentParams,
        validateId,
        validateUpdateMedicamentParams
    },
    authMiddleware
} = require('../middlewares')

const api = express.Router()

api.post('/', [authMiddleware, validateMedicamentParams], MedicamentController.create)
api.get('/', [authMiddleware], MedicamentController.get)
api.get('/find', [authMiddleware], MedicamentController.getByIdOrName)
api.put('/:id', [authMiddleware, validateId, validateUpdateMedicamentParams], MedicamentController.update)
api.delete('/:id', [authMiddleware, validateId], MedicamentController.delete)

module.exports = api
