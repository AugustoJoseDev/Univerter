const { prefixes, types } = require("../data.json")

function convert({ from, to, value }) {

    let fromUnit = resolve(from)
    let toUnit = resolve(to)

    if (fromUnit.type !== toUnit.type) {
        throw new Error(`It's not possible convert '${ fromUnit.name }' (${ fromUnit.type }) to '${ toUnit.name }' (${ toUnit.type }). The unit types must be the same.`)
    }

    return value * fromUnit.value / toUnit.value
}


function resolve(expression) {

    let matches = []

    let number = undefined

    if (match = expression.match(/^(\d+(?:\.\d+)?)/)) {
        number = match[ 1 ]
        expression = expression.slice(number.length)
        number = Number.parseFloat(number)
    }

    for (const unit of resolveUnit(expression)) {
        matches.push(unit)
    }
    for (const prefix of resolvePrefix(expression)) {
        matches.push(prefix)
    }

    for (let i = 1; i < expression.length; i++) {

        let prefixes = resolvePrefix(expression.substring(0, i))
        let units = resolveUnit(expression.substring(i))

        for (const prefix of prefixes) {
            for (const unit of units) {
                matches.push({
                    name: prefix.name + unit.name,
                    symbol: prefix.symbol + unit.symbol,
                    value: prefix.value * unit.value,
                    type: unit.type
                })
            }
        }

    }

    if (matches.length === 0) {
        throw new Error(`Unknown name or symbol '${ expression }'.`)
    }

    if (matches.length > 1) {
        console.warn(`The expression '${ expression }' is ambiguous, prefer to use the extensive name. Matches: ${ matches.map(({ type, name }) => `${ name } (${ type })`).join(', ') }.`)
    }

    if (number !== undefined)
        matches = matches.map(({ name, symbol, type, value }) => ({ name, symbol, type, value: value * number }))

    return matches[ 0 ]
}

function resolveUnit(expression) {

    const matches = []

    for (let type in types) {
        for (let { name, symbol, value, aliases } of types[ type ]) {
            if ([ name, symbol, ...aliases ].includes(expression)) {
                matches.push({ name, symbol, value, type })
            }
        }
    }

    return matches
}

function resolvePrefix(expression) {

    const matches = []

    for (let { name, symbol, value } of prefixes) {
        if ([ name, symbol ].includes(expression)) {
            matches.push({ name, symbol, value, type: "prefix" })
        }
    }


    return matches
}

module.exports = { convert, prefixes, types }