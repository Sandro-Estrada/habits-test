const DATABASE = []
let INDEX = 1

class Medicament {
    
    constructor(medicament = {}) {
        if (typeof medicament !== 'object') {
            throw new Error('Invalid param')
        }
        this.medicament = medicament
        this._PROPERTIES = {
            id: 'number',
            name: 'string',
            type: 'string',
            quantity: 'number',
            createdAt: 'string',
            price: 'number',
            location: 'string',
            updatedAt: 'string'
        }
    }

    get() {
        return this.medicament
    }

    _validateProperties() {
        const object = this.medicament
        const properties = this._PROPERTIES
        const mainObject = {}
        Object.keys(object).forEach(key => {
            if (properties.hasOwnProperty(key)) {
                mainObject[key] = object[key]
            }
        })
        Object.keys(properties).forEach(key => {
            if (!mainObject.hasOwnProperty(key) || typeof mainObject[key] !== properties[key]) {
                throw new Error('Invalid medicament properties')
            }
        })
    }

    save() {
        try {
            let isNew = false
            if (!this.medicament.hasOwnProperty('createdAt')) {
                this.medicament.createdAt = (new Date()).toISOString()
            }
            if (!this.medicament.hasOwnProperty('id')) {
                this.medicament.id = INDEX
                INDEX += 1
                isNew = true
            }
            this.medicament.updatedAt = (new Date()).toISOString()
            this._validateProperties()
            if (isNew) {
                DATABASE.push(this.medicament)
            } else {
                const index = DATABASE.findIndex(item => (item.id === this.medicament.id))
                DATABASE[index] = this.medicament
            }
            return this.medicament
        } catch (error) {
            throw error
        }
    }

    static getAll() {
        return DATABASE
    }

    static getById(id) {
        const medicament = DATABASE.find(item => (item.id === id))
        return medicament ? new Medicament(medicament) : null
    }

    static getByName(name) {
        const medicament = DATABASE.find(item => (item.name === name))
        return medicament ? new Medicament(medicament) : null
    }

    static delete(id) {
        const index = DATABASE.findIndex(item => (item.id === id))
        if (index !== -1) {
            DATABASE.splice(index, 1)
        }
    }
}

module.exports = Medicament
