
const ERROR_MESSAGES = {
    INTERNAL_ERROR: {
        statusCode: 500, message: 'Some error was ocurred'
    },
    INVALID_FILTER: {
        statusCode: 400, message: 'Invalid filter'
    },
    MEDICAMENT_NOT_FOUND: {
        statusCode: 404, message: 'Medicament not found'
    },
    INVALID_PARAMS: {
        statusCode: 400, message: 'Bad request'
    },
    INVALID_ID: {
        statusCode: 400, message: 'Invalid id'
    },
    USER_NOT_FOUND: {
        statusCode: 404, message: 'User not found'
    },
    INVALID_PASSWORD: {
        statusCode: 400, message: 'Invalid password or user'
    },
    UNAUTHORIZED: {
        statusCode: 401, message: 'Unauthorized'
    }
}

module.exports = ERROR_MESSAGES
