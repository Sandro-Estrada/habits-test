const jwt = require('jsonwebtoken')
const ERRORS = require('../common/errors')
const jwtSecret = 'xXDxqwVqbWea4xGkzXvmc5E'

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) return next(ERRORS.UNAUTHORIZED)
        token = token.replace('Bearer ', '')
        const decoded = jwt.verify(token, jwtSecret)
        req.decoded = decoded
        next()
    } catch (error) {
        console.error(error)
        next(ERRORS.UNAUTHORIZED)
    }
}