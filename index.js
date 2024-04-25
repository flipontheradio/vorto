function findDistance(pointA, pointB){
    console.log(pointA)
    console.log(pointB)
    return Math.sqrt(Math.pow((pointA[0] - pointB[0]), 2) + Math.pow((pointA[1] - pointB[1]),2))
}

function parseCoords(coords){
    const splitCoords = coords.split(',')
    return [splitCoords[0].substring(1), splitCoords[1].slice(0, -1)]
}

//Load file contents
var fs = require("fs");
const file = fs.readFileSync(process.argv[2]).toString('utf-8');;
const fileByLine = file.split('\n')

let routeDetails = []

for(let i = 1; i < fileByLine.length; i++){
    if(fileByLine[i] != ''){
      let parsedLine = fileByLine[i].split(' ')
      let sourceCoord = parseCoords(parsedLine[1])
      let destCoord = parseCoords(parsedLine[2])

      routeDetails.push([parsedLine[0], sourceCoord, destCoord, findDistance(sourceCoord, destCoord)])
    }
}

console.log(routeDetails)