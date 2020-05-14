const {
  options
} = require("./options.js");

function cli(args) {
  const path = args[2];
  const opts = args.slice(3);
  const argsToString = opts.join(" ");
  console.log(argsToString);

  options(path, argsToString);

}

module.exports = {
  cli,
};
