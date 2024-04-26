const average = array => array.reduce((a, b) => a + b) / array.length;
const median = array => array[Math.floor(array.length/2)]

function groupTrips(travelMatrix, tripDetails, allStartDist, allFinishDist, allTraverseTimes){
    console.log(average(allStartDist))
    console.log(median(allStartDist.sort()))

    console.log(average(allFinishDist))
    console.log(median(allFinishDist.sort()))

    console.log(average(allTraverseTimes))
    console.log(median(allTraverseTimes.sort()))

    let possibleRoutes = findCloseGroups(travelMatrix, tripDetails, "70")

    let possibleSchedules = buildSchedules(possibleRoutes, tripDetails)
    
    return {routes: "", cost: ""}
}

function findCloseGroups(travelMatrix, tripDetails, threshold){
    let possibleRoutes = []

    for(let singleTrip in tripDetails){
        let closeNeighbors = []

        for(let singleRoute in tripDetails){
            if(travelMatrix[singleTrip][singleRoute] < threshold && travelMatrix[singleTrip][singleRoute] > 0){
                    //add close neighbor, cost of trip, and cost to get back home from neighbor
                    closeNeighbors.push([Number(singleRoute) + 1, travelMatrix[singleTrip][singleRoute], tripDetails[Number(singleRoute)][5]])
            }
        }
        possibleRoutes.push(closeNeighbors)
    }
    return possibleRoutes
}

function buildSchedules(possibleRoutes, tripDetails){
    let schedules = []
    for(let startPoint of possibleRoutes){
        for(let aSched of startPoint){
            console.log(aSched)
        }
    }
    console.log(tripDetails)
}

module.exports = { groupTrips };