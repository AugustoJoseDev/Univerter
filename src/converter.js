const { prefixes, types } = require("../data.json")

function convert({ value, from, to }) {

    let formUnitValue = undefined
    let toUnitValue = undefined

    for (let type of Object.values(types)) {
        for (let { name, symbol, value, aliases } of Object.values(type)) {
            if (formUnitValue === undefined && [ name, symbol, ...aliases ].includes(from)) {
                formUnitValue = value
            }
            if (toUnitValue === undefined && [ name, symbol, ...aliases ].includes(to)) {
                toUnitValue = value
            }
        }
    }

    if (formUnitValue === undefined) {
        throw new Error(`Unknown name or symbol '${ from }'`)
    }
    if (toUnitValue === undefined) {
        throw new Error(`Unknown name or symbol '${ to }'`)
    }

    return value * formUnitValue / toUnitValue
}

module.exports = { convert, prefixes, types }