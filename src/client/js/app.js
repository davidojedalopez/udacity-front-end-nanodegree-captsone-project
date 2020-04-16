let submitButton = document.querySelector('form[name="geoname"]')
if(submitButton) {
  submitButton.addEventListener('submit', handleSubmit)
}

let temp = new Date().toLocaleDateString().split('/')
let today = `${temp[2]}-${temp[0].length == 1 ? '0' + temp[0] : temp[0]}-${temp[1]}`
let startInput = document.querySelector('input[name="travel-date-start"')
if(startInput) {
  startInput.setAttribute('min', today)
  startInput.value = today
}

let futureDate = new Date(new Date(temp).setDate(new Date().getDate() + 3)).toISOString().split('T')[0]
let endInput = document.querySelector('input[name="travel-date-end"')
if(endInput) {
  endInput.setAttribute('min', futureDate)
  endInput.value = futureDate
}

async function handleSubmit(event) {
  event.preventDefault()
  disableSubmit()
  cleanCurrentTravel()
  showLoading()

  let placename = document.querySelector('input[name="placename"]').value
  let place = await Client.getPlace(placename)
  if(!place) {
    alert(`Couldn't find information about ${placename}. Is it written correctly?`)
    return
  }

  let { lat, lng } = place
  
  
  let placeImgs = await Client.getPlaceImages(placename)
  if(placeImgs.total === 0) {
    alert(`Couldn't find photos for ${placename}.`)    
  }
  Client.addPhotos(placeImgs)
  
  let start = new Date(document.querySelector('input[name="travel-date-start"]').value)
  let end = new Date(document.querySelector('input[name="travel-date-end"]').value)
  let inAWeek = new Date(new Date(today).setDate(new Date().getDate() + 7))  

  let weather = null
  if(start < inAWeek) {
    weather = await Client.getCurrentWeather(lat, lng)
  }

  let forecast = await Client.getWeatherForecast(lat, lng)    

  hideLoading()
  enableSubmit()
  
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