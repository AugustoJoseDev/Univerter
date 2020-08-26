#!/usr/bin/env node

const argv = require("yargs")
    .usage("Usage: $0 [options] [--type <type>] <value> <from> <to>")
    .example("$0 1 ft --to in", "It will return the value 12")
    .example("$0 1 ft in", "Also returns 12")
    .help()
    .version()
    .option("type", {
        type: "string",
        describe: "The type of value (ex: length, area, volume, etc.),\nif not given, it will be recognized automatically.",
        alias: "t"
    })
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
    .strict(true)
    .argv

console.warn("Not avaliable yet ;-;")
