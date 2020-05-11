const colors = require ("colors");
const cliOptions = require("./options");
const process = require('process'); 
const mdLinks = require('mdLinks')  ;
const args = process.argv;
const pathCLI = args[0];
const input = [];
for (let i = 1; i < args.length; i += 1) {
    input.push(args[i]);
}
const newInput = input.join(" ");

const { log } = console;

if (pathCLI === undefined) {
    log(`---valid arguments---
    ("option1:") md-links <path-to-file>`);
} else {
    mdLinks
}