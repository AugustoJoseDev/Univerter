#!/usr/bin/env node
const yargs = require('yargs')
const Table = require("cli-table3")

const { convert } = require("../src/converter")

const { value, from, to, type } = yargs
    .usage("Usage: $0 [--value] <value> [--from] <from> [--to] <to>")
    .example("$0 1 ft --to inches", "Returns 12")
    .example("$0 1 ft in", "Returns 12")
    .example("$0 --from yds 1 --to in", "Returns 3")
    .example("$0 metres inches --value 1", "Returns 39.37")
    .example("$0 1 --from='nautic mile' metres", "Returns 1852")
    .help()
    .version()
    .option("value", {
        type: "number",
        describe: "Specifies the input value."
    })
    .option("from", {
        type: "string",
        describe: "Specifies the unit of the input value."
    })
    .option("to", {
        type: "string",
        describe: "Specifies the output unit."
    })
    .check((argv) => {  //catching unspecified arguments
        let missing = []

        for (let arg of [ 'value', 'from', 'to' ]) {
            if (argv[ arg ] === undefined) {
                argv[ arg ] = argv._.shift()
                if (argv[ arg ] === undefined)
                    missing.push(arg)
            }
        }

        if (missing.length) {
            throw new Error(`Missing required argument${ missing.length > 1 ? 's' : '' }: ` + missing.join(', '))
        }
        return true
    })
    .epilogue(`See the accepted units of measure:\n\n${ unitsTables() }`)
    .strict(true)
    .argv


try {
    console.log(convert({ value, from, to }))
} catch (error) {
    yargs
        .epilog(error.message)
        .showHelp()
        .exit()
}

function unitsTables() {
    return " Not avaliable yet. ;-;\n"

    let table = new Table({
        head: [ { colSpan: 3, hAlign: 'center', content: 'Lenght' } ],
    })
    table.push([ "Name", "Symbol", "Aliases" ])
    table.push([ 7, 8, 9 ])

    return table.toString()
}