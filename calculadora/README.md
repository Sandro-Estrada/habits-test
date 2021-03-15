# Calculadora

Esté proyecto fue creado para generar una **calculadora** para la prueba de **Habits**.

## Algoritmo

El algoritmo está documentando en la carpeta [docs](docs) llamado [Algoritmo](docs/Algoritmo.png).

## Código comentado

```javascript
// OPERADORES
const operators = {
    '*': (a, b) => {
        return a * b
    },
    '/': (a, b) => {
        return a / b
    }
}
/**
 * 
 * @param {String} s cadena de operaciones ej. '4-7+8+9/2*3'
 * @returns {Number} result number or NaN
 */
const calculate = (s) => {
    // Limpiar la operación de espacios en blanco
    const cleanString = s.replace(/\s/g, '')
    // Validar si es una operación valida
    const regex = /^[+\-]?[0-9]+([\.][0-9]+)?([+\-\/\*][0-9]+([\.][0-9]+)?)*$/
    if (!regex.test(cleanString) || cleanString.length > 20) {
        return NaN
    }
    // Separar valor con signo en un arreglo. Ej. ['+5', '*8', '-3']
    const separateOperators = (cleanString.match(/[+\-\/\*]?([0-9\.]+)/g) || [])
    // Calcular operaciones de alto orden (* || /)
    const subCalculate = (values = []) => {
        // Recorrer arreglo
        for (let index = 0; index < values.length; index++) {
            const val = values[index]
            // Validar si contiene una operación de alto orden
            if (val.includes('*') || val.includes('/')) {
                // Obtener operador
                const operator = val.charAt(0)
                // Obtener número anterior al de alto orden
                const beforeNumber = parseFloat(values[index - 1])
                // Obtener solo número actual (sin operador)
                const currentNumber = parseFloat(val.substring(1))
                // Calcular operaciones de alto orden (* || /)
                const value = operators[operator](beforeNumber, currentNumber)
                // Asignar valor resultante al número anterior en el arreglo
                values[index - 1] = value
                // Eliminar posición actual del arreglo
                values.splice(index, 1)
                // Reducir en 1 el index
                index--
            }
        }
        // Regresar nuevo arreglo solo con operaciones (+ || -)
        return values
    }
    const resultArray = subCalculate(separateOperators)
    // Calcular y regresar operaciones (+ || -)
    return +resultArray.reduce((val1, val2) => {
        return parseFloat(val1) + parseFloat(val2)
    })
}
const input = '4-7+8+9/2*3'
const result = calculate(input)
// Imprimir resultado
console.log(result)
```

## Licencia

El proyecto usa una licencia de tipo [ISC](https://opensource.org/licenses/ISC)

## Autor

[Sandro Estrada](https://www.linkedin.com/in/sandro-estrada-elizondo-1b5411171/)
