const baseUrl = 'http://localhost:8081/';

let saveTripButton = document.querySelector('button[data-id="save-trip"]')
if(saveTripButton) {
  saveTripButton.addEventListener('click', getTripData)
}

let latestTripButton = document.querySelector('button[data-id="latest-trip"]')
if(latestTripButton) {
  latestTripButton.addEventListener('click', getTrip)
}

async function saveTrip(placename, start, end) {
  let response = await fetch(baseUrl + 'save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({placename: placename, start: start, end: end})
  })  
  try {    
    let json = await response.json() 
    return json.trip
  } catch (error) {
    console.error(error)
  }
}

async function getTripData() {
  let placename = document.querySelector('input[name="placename"]').value
  let start = document.querySelector('input[name="travel-date-start"]').value
  let end = document.querySelector('input[name="travel-date-end"]').value
  let trip = await saveTrip(placename, start, end)  
  if(trip.placename) {
    alert(`Your trip to ${trip.placename} from ${trip.start} to ${trip.end} has been saved!`)
  } else {
    alert('Something went wrong while saving your trip :(')
  }
}

async function getLatestTrip() {
  let response = await fetch(baseUrl + 'latestTrip')
  try {
    let json = await response.json()    
    return json.trip
  } catch(error) {
    console.error(error)
  }
}

async function getTrip() {
  let latestTrip = await getLatestTrip()
  if(!latestTrip.placename) {
    alert("You don't have any trip saved :(")
    return
  }

  document.querySelector('input[name="placename"]').value =  latestTrip.placename
  document.querySelector('input[name="travel-date-start"]').value = latestTrip.start
  document.querySelector('input[name="travel-date-end"]').value = latestTrip.end
  document.querySelector('button[type="submit"]').click()
}

export {
  saveTrip,
  getLatestTrip
}