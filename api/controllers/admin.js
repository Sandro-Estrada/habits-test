const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const ERRORS = require('../common/errors')
const jwtSecret = 'xXDxqwVqbWea4xGkzXvmc5E'
const saltRounds = 10

class AdminController {
    static async login(req, res, next) {
        try {
            const {
                body: {
                    user, password
                }
            } = req
            const admin = Admin.getByUser(user)
            if (!admin) {
                return next(ERRORS.INVALID_PASSWORD)
            }
            const payload = admin.get()
            const adminPassword = payload.password
            const areEqual = await bcrypt.compare(password, adminPassword)
            if (!areEqual) {
                return next(ERRORS.INVALID_PASSWORD)
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' })
            res.json({ token })
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
    static async create(req, res, next) {
        try {
            const {
                body: {
                    user, password
                }
            } = req
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            const userData = {
                user,
                password: encryptedPassword
            }
            const admin = new Admin(userData)
            admin.save()
            res.status(201).end()
        } catch (err) {
            console.error(err)
            next(ERRORS.INTERNAL_ERROR)
        }
    }
}

module.exports = AdminController
