const adminMiddleware = require('./adminValidators')
const medicamentMiddleware = require('./medicamentValidators')
const errorHandlerMiddleware = require('./errorHandler')
const authMiddleware = require('./auth')

module.exports = {
    adminMiddleware,
    medicamentMiddleware,
    errorHandlerMiddleware,
    authMiddleware
}