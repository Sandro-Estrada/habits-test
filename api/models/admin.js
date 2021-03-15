const DATABASE = []
let INDEX = 1

class Admin {
    constructor(user = {}) {
        if (typeof user !== 'object') {
            throw new Error('Invalid param')
        }
        this.user = user
        this._PROPERTIES = {
            id: 'number',
            user: 'string',
            password: 'string',
            createdAt: 'string',
            updatedAt: 'string'
        }
    }

    get() {
        return this.user
    }

    _validateProperties() {
        const object = this.user
        const properties = this._PROPERTIES
        const mainObject = {}
        Object.keys(object).forEach(key => {
            if (properties.hasOwnProperty(key)) {
                mainObject[key] = object[key]
            }
        })
        Object.keys(properties).forEach(key => {
            if (!mainObject.hasOwnProperty(key) || typeof mainObject[key] !== properties[key]) {
                throw new Error('Invalid user properties')
            }
        })
    }

    save() {
        try {
            let isNew = false
            if (!this.user.hasOwnProperty('createdAt')) {
                this.user.createdAt = (new Date()).toISOString()
            }
            if (!this.user.hasOwnProperty('id')) {
                this.user.id = INDEX
                INDEX += 1
                isNew = true
            }
            this.user.updatedAt = (new Date()).toISOString()
            this._validateProperties()
            if (isNew) {
                DATABASE.push(this.user)
            } else {
                const index = DATABASE.findIndex(item => (item.id === this.user.id))
                DATABASE[index] = this.user
            }
            return this.user
        } catch (error) {
            throw error
        }
    }

    static getAll() {
        return DATABASE
    }

    static getById(id) {
        const user = DATABASE.find(item => (item.id === id))
        return user ? new Admin(user) : null
    }

    static getByUser(user) {
        const admin = DATABASE.find(item => (item.user === user))
        return admin ? new Admin(admin) : null
    }

    static delete(id) {
        const index = DATABASE.findIndex(item => (item.id === id))
        if (index !== -1) {
            DATABASE.splice(index, 1)
        }
    }

}

module.exports = Admin
