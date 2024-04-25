//Load file contents
var fs = require("fs");
const file = fs.readFileSync(process.argv[2]).toString('utf-8');;
const fileByLine = file.split('\n').shift()

console.log(fileByLine)