let fs = require("fs");
const groupTrips = require("./groupTrips");
const { start } = require("repl");


function findDistance(pointA, pointB){
    return Math.sqrt(Math.pow((pointA[0] - pointB[0]), 2) + Math.pow((pointA[1] - pointB[1]),2))
}

function parseCoords(coords){
    const splitCoords = coords.split(',')
    return [splitCoords[0].substring(1), splitCoords[1].slice(0, -1)]
}

//Load file contents
const file = fs.readFileSync(process.argv[2]).toString('utf-8');;
const fileByLine = file.split('\n')

let allStartDist = []
let allFinishDist = []
let tripDetails = []

//Compute length of trips
for(let i = 1; i < fileByLine.length; i++){
    if(fileByLine[i] != ''){
        let parsedLine = fileByLine[i].split(' ')
        let startCoord = parseCoords(parsedLine[1])
        let destCoord = parseCoords(parsedLine[2])
        let startDist = findDistance([0,0],startCoord)
        let finishDist = findDistance(destCoord,[0,0])

        allStartDist.push(startDist)
        allFinishDist.push(finishDist)

        tripDetails.push([parsedLine[0], startCoord, destCoord, findDistance(startCoord, destCoord), startDist, finishDist])
    }
}

//initialize matrix
let travelMatrix = Array(tripDetails.length).fill().map(()=>Array(tripDetails.length ).fill())

let allTraverseTimes = []

//Build matrix of length between all trips
for(let endPoint in tripDetails){
    const endOfJob = tripDetails[endPoint][0] - 1
    for(let startPoint in tripDetails){
        const startOfJob = tripDetails[startPoint][0] - 1 

        if(endOfJob != startOfJob){
            const noLoadDistance = findDistance(tripDetails[startPoint][2], tripDetails[endPoint][1])

            travelMatrix[startPoint][endPoint] = noLoadDistance
            allTraverseTimes.push(noLoadDistance)
        } else {
            travelMatrix[endOfJob][startOfJob] = 0
        }
    }
}

groupTrips.groupTrips(travelMatrix, tripDetails, allStartDist, allFinishDist, allTraverseTimes)