const ERRORS = require('../common/errors')

const validateAdminParams = (req, res, next) => {
    const {
        body: {
            user, password
        }
    } = req
    if (
        (typeof user !== 'string' || !user.trim())
        || (typeof password !== 'string' || !password.trim())
    ) {
        return next(ERRORS.INVALID_PARAMS)
    }
    next()
}

module.exports = {
    validateAdminParams
}