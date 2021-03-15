const ErrorResponse = require('../../libs/ErrorResponse')
const ERROR_MESSAGES = require('../messages/errors')

const ERRORS = {
    INTERNAL_ERROR: new ErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR),
    MEDICAMENT_NOT_FOUND: new ErrorResponse(ERROR_MESSAGES.MEDICAMENT_NOT_FOUND),
    INVALID_FILTER: new ErrorResponse(ERROR_MESSAGES.INVALID_FILTER),
    INVALID_PARAMS: new ErrorResponse(ERROR_MESSAGES.INVALID_PARAMS),
    INVALID_ID: new ErrorResponse(ERROR_MESSAGES.INVALID_ID),
    USER_NOT_FOUND: new ErrorResponse(ERROR_MESSAGES.USER_NOT_FOUND),
    INVALID_PASSWORD: new ErrorResponse(ERROR_MESSAGES.INVALID_PASSWORD),
    UNAUTHORIZED: new ErrorResponse(ERROR_MESSAGES.UNAUTHORIZED)
}

module.exports = Object.freeze(ERRORS)
