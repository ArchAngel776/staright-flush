const Cli = require("./build/Cli").default

const args = process.argv.slice(2)

const command = args[0] || ""
const params = args.slice(1)

const cli = new Cli(command, ...params)
cli.run()