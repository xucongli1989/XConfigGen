const path = require("path");
const { execSync } = require('child_process');

const rootPath = __dirname + "\\";
const cmd = `node ${path.resolve(rootPath, "../dist/index.js")} --xconfig ${path.resolve(rootPath, "XConfigGen-Config.json")}`
console.log(`Running to create configuration: ${cmd}`)
execSync(cmd, { stdio: 'inherit' })