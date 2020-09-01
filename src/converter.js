const { prefixes, types } = require("../data.json")

function convert({ value, from, to }) {

    let formUnitValue = undefined
    let toUnitValue = undefined

    let typeFrom = undefined
    let typeTo = undefined

    for (let type of Object.values(types)) {
        for (let { name, symbol, value, aliases } of Object.values(type)) {
            if (formUnitValue === undefined && [ name, symbol, ...aliases ].includes(from)) {
                formUnitValue = value
                typeFrom = type
            }
            if (toUnitValue === undefined && [ name, symbol, ...aliases ].includes(to)) {
                toUnitValue = value
                typeTo = type
            }
        }
    }

    if (formUnitValue === undefined) {
        throw new Error(`Unknown name or symbol '${ from }'`)
    }
    if (toUnitValue === undefined) {
        throw new Error(`Unknown name or symbol '${ to }'`)
    }

    if (typeFrom !== typeTo) {
        throw new Error(`It's not possible convert '${ from }' to '${ to }'. The unit types must be the same.`)
    }


    return value * formUnitValue / toUnitValue
}

module.exports = { convert, prefixes, types }