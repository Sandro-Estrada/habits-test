const ERRORS = require('../common/errors')

const validateMedicamentParams = (req, res, next) => {
    const {
        body: {
            name, type, quantity, price, location
        }
    } = req
    if (
        (typeof name !== 'string' || !name.trim())
        || (typeof type !== 'string' || !type.trim())
        || (typeof location !== 'string' || !location.trim())
        || (typeof quantity !== 'number')
        || (typeof price !== 'number')
    ) {
        return next(ERRORS.INVALID_PARAMS)
    }
    next()
}

const validateId = (req, res, next) => {
    const {
        params: {
            id
        }
    } = req
    if (isNaN(id)) {
        return next(ERRORS.INVALID_ID)
    }
    next()
}

const validateUpdateMedicamentParams = (req, res, next) => {
    const {
        body: {
            name, type, quantity, price, location
        }
    } = req
    if (
        (name && (typeof name !== 'string' || !name.trim()))
        || (type && (typeof type !== 'string' || !type.trim()))
        || (location && (typeof location !== 'string' || !location.trim()))
        || (quantity && (typeof quantity !== 'number'))
        || (price && (typeof price !== 'number'))
    ) {
        return next(ERRORS.INVALID_PARAMS)
    }
    next()
}

module.exports = {
    validateMedicamentParams,
    validateId,
    validateUpdateMedicamentParams
}