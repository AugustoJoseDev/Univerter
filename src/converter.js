const { prefixes, types, aliases } = require("../data.json")

function convert({ value, from, to, type }) {

    if (type !== undefined && !(type in types))
        throw new Error("Invalid type!")

    let formUnitValue = undefined
    let toUnitValue = undefined

    if (type !== undefined) {
        for (let unit in aliases[ type ]) {
            if (formUnitValue === undefined && (unit === from || aliases[ type ][ unit ].includes(from))) {
                formUnitValue = types[ type ][ unit ]
            }
            if (toUnitValue === undefined && (unit === to || aliases[ type ][ unit ].includes(to))) {
                toUnitValue = types[ type ][ unit ]
            }
        }
    } else {
        for (let t in types) {
            for (let unit in aliases[ t ]) {
                if (formUnitValue === undefined && (unit === from || aliases[ t ][ unit ].includes(from))) {
                    formUnitValue = types[ t ][ unit ]
                }
                if (toUnitValue === undefined && (unit === to || aliases[ t ][ unit ].includes(to))) {
                    toUnitValue = types[ t ][ unit ]
                }
            }
        }
    }

    if (formUnitValue === undefined) {
        throw new Error(`Unknown unit name or symbol '${ from }'`)
    }
    if (toUnitValue === undefined) {
        throw new Error(`Unknown unit name or symbol '${ to }'`)
    }

    return value * formUnitValue / toUnitValue
}

module.exports = { convert }