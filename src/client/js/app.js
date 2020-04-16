let submitButton = document.querySelector('form[name="geoname"]')
if(submitButton) {
  submitButton.addEventListener('submit', handleSubmit)
}

// Set start date input min and current values
let temp = new Date().toLocaleDateString().split('/')
let today = `${temp[2]}-${temp[0].length == 1 ? '0' + temp[0] : temp[0]}-${temp[1]}`
let startInput = document.querySelector('input[name="travel-date-start"')
if(startInput) {
  startInput.setAttribute('min', today)
  startInput.value = today
}

// Set end date input min and current values
let futureDate = new Date(new Date(temp).setDate(new Date().getDate() + 3)).toISOString().split('T')[0]
let endInput = document.querySelector('input[name="travel-date-end"')
if(endInput) {
  endInput.setAttribute('min', futureDate)
  endInput.value = futureDate
}

async function handleSubmit(event) {
  event.preventDefault()
  // Prevent from submiting form while one is still being processed
  disableSubmit()
  // Remove data from previous form submit
  cleanCurrentTravel()
  // Show loading animation
  showLoading()

  // Get location coordinates from name 
  let placename = document.querySelector('input[name="placename"]').value
  let place = await Client.getPlace(placename)
  if(!place) {
    alert(`Couldn't find information about ${placename}. Is it written correctly?`)
    return
  }

  // Check if trip is within a week
  let start = new Date(document.querySelector('input[name="travel-date-start"]').value)
  let end = new Date(document.querySelector('input[name="travel-date-end"]').value)
  let inAWeek = new Date(new Date(today).setDate(new Date().getDate() + 7))  

  let { lat, lng } = place
  let weather = null
  // If trip is within a week, get current weather, else, just get the forecast
  if(start < inAWeek) {
    weather = await Client.getCurrentWeather(lat, lng)
  }
  let forecast = await Client.getWeatherForecast(lat, lng)    
   
  // Get photos of place
  let placeImgs = await Client.getPlaceImages(placename)
  if(placeImgs.total === 0) {
    alert(`Couldn't find photos for ${placename}.`)    
  }
  Client.addPhotos(placeImgs)    

  hideLoading()
  enableSubmit()
  
  // Get trip duration
  let daysDifference = getDaysDifference(start, end)
  
  Client.addWeather(weather, document.querySelector('.current-weather'))
  // Remove current day from forecast and add it to the DOM
  Client.addForecast(forecast.slice(1, daysDifference + 1), document.querySelector('.forecast'))  
  
  addTripDuration(daysDifference)
}

function addTripDuration(days) {
  let element = document.createElement('h2')
  element.innerText = `Trip lasts ${days} days 📅`

  document.querySelector('.trip-duration').appendChild(element)
}

function cleanCurrentTravel() {
  document.querySelector('.weather').innerHTML = '<div class="current-weather"></div><div class="forecast"></div>'
  document.querySelector('.photos').innerHTML = ''
  document.querySelector('.trip-duration').innerHTML = ''
}

function showLoading() {
  document.querySelector('.animation').style.visibility = 'visible'
}

function hideLoading() {
  document.querySelector('.animation').style.visibility = 'hidden'
}

function disableSubmit() {
  document.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled')
}

function enableSubmit() {
  document.querySelector('button[type="submit"]').removeAttribute('disabled')
}

function getDaysDifference(start, end) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  start = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  end = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())

  return Math.floor( (end - start) / _MS_PER_DAY)
}

export { handleSubmit }