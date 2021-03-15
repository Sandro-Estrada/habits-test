const Medicament = require('../models/medicament')
const ERRORS = require('../common/errors')

class MedicamentController {
    static async get(req, res, next) {
        try {
            const medicaments = Medicament.getAll()
            res.json({ medicaments })
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
    static async getByIdOrName(req, res, next) {
        try {
            const {
                query: {
                    filter
                }
            } = req
            
            if (!filter) {
                return next(ERRORS.INVALID_FILTER) 
            }

            let medicament = null
            if (isNaN(filter)) {
                medicament = Medicament.getByName(filter)
            } else {
                medicament = Medicament.getById(+filter)
            }

            if (!medicament) {
                return next(ERRORS.MEDICAMENT_NOT_FOUND)
            }

            res.json({ medicament: medicament.get() })
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
    static async create(req, res, next) {
        try {
            const {
                body
            } = req

            const medicament = new Medicament(body)
            const saved = medicament.save()
            req.app.io.emit('notificación', {...saved, event: 'create'})
            res.status(201).end()
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
    static async update(req, res, next) {
        try {
            const {
                params: { id },
                body: {
                    name,
                    type,
                    quantity,
                    price,
                    location
                }
            } = req

            const medicament = Medicament.getById(+id)

            if (!medicament) {
                return next(ERRORS.MEDICAMENT_NOT_FOUND)
            }
            medicament.medicament.name = name || medicament.medicament.name
            medicament.medicament.type = type || medicament.medicament.type
            medicament.medicament.quantity = +quantity || medicament.medicament.quantity
            medicament.medicament.price = +price || medicament.medicament.price
            medicament.medicament.location = location || medicament.medicament.location

            medicament.save()
            res.status(204).end()
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
    static async delete(req, res, next) {
        try {
            const {
                params: { id }
            } = req

            const medicament = Medicament.getById(+id)

            if (!medicament) {
                return next(ERRORS.MEDICAMENT_NOT_FOUND)
            }

            Medicament.delete(+id)
            req.app.io.emit('notificación', {event: 'delete'})
            res.status(204).end()
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
}

module.exports = MedicamentController
