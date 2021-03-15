const cleanObject = (obj = {}) => {
    const clenedObject = {}
    for (let key in obj) {
        if (obj[key] != null)
            clenedObject[key] = obj[key]
    }
    return clenedObject
}

module.exports = {
    cleanObject
}