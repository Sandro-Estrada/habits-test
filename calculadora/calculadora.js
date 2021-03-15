const operators = {
    '*': (a, b) => {
        return a * b
    },
    '/': (a, b) => {
        return a / b
    }
}
const calculate = (s) => {
    const cleanString = s.replace(/\s/g, '')
    const regex = /^[+\-]?[0-9]+([\.][0-9]+)?([+\-\/\*][0-9]+([\.][0-9]+)?)*$/
    if (!regex.test(cleanString) || cleanString.length > 20) {
        return NaN
    }
    const separateOperators = (cleanString.match(/[+\-\/\*]?([0-9\.]+)/g) || [])
    const subCalculate = (values = []) => {
        for (let index = 0; index < values.length; index++) {
            const val = values[index]
            if (val.includes('*') || val.includes('/')) {
                const operator = val.charAt(0)
                const beforeNumber = parseFloat(values[index - 1])
                const currentNumber = parseFloat(val.substring(1))
                const value = operators[operator](beforeNumber, currentNumber)
                values[index - 1] = value
                values.splice(index, 1)
                index--
            }
        }
        return values
    }
    const resultArray = subCalculate(separateOperators)
    return +resultArray.reduce((val1, val2) => {
        return parseFloat(val1) + parseFloat(val2)
    })
}
const input = '4-7+8+9/2*3'
const result = calculate(input)
console.log(result)
