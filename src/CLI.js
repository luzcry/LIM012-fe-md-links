const {
  options
} = require("./options.js");

export function cli(args) {
  const path = args[2]
  console.log(path)
  options(path, options)
}