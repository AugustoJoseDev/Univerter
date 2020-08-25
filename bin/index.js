#!/usr/bin/env node
const yargs = require("yargs")

const argv = yargs
    .usage("Usage: $0 [options] [--type <type>] <value> <from> <to>")
    .help()
    .version()
    .option("type", {
        type: "string",
        describe: "The type of value (ex: length, area, volume, etc.),\nif not given, it will be recognized automatically."
    })
    .option("value", {
        type: "number",
        describe: "The input value.",
        alias: "v"
    })
    .option("from", {
        type: "string",
        describe: "The unit of the input value.",
        alias: "f"
    })
    .option("to", {
        type: "string",
        describe: "The output unit.",
        alias: "t"
    })
    .argv

console.warn("Not avaliable yet );")