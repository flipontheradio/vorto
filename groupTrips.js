const average = array => array.reduce((a, b) => a + b) / array.length;
const median = array => array[Math.floor(array.length/2)]

function groupTrips(travelMatrix, tripDetails, allStartDist, allFinishDist, allTraverseTimes){
    console.log(average(allStartDist))
    console.log(median(allStartDist.sort()))

    console.log(average(allFinishDist))
    console.log(median(allFinishDist.sort()))

    console.log(average(allTraverseTimes))
    console.log(median(allTraverseTimes.sort()))

    findCloseGroups(travelMatrix, tripDetails, "70")
    
    return {routes: "", cost: ""}
}

function findCloseGroups(travelMatrix, tripDetails, threshold){
    let possibleRoutes = []

    for(let singleTrip in tripDetails){
        let closeNeighbors = []

        for(let singleRoute in tripDetails[singleTrip]){
            let matrixCopy = travelMatrix
                if(travelMatrix[singleRoute][singleTrip] < threshold && travelMatrix[singleRoute][singleTrip] > 0){
                    matrixCopy[singleRoute][singleTrip] = 0
                    closeNeighbors.push([Number(singleTrip) + 1, Number(singleRoute) + 1])
                }
        }
        possibleRoutes.push(closeNeighbors)
    }
    
  return possibleRoutes
}

module.exports = { groupTrips };