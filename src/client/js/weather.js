const forecastWeatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbitKey = '727a18fd859b4b6f82c5a51926b80c3c'
const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?`

async function getCurrentWeather(latitude, longitude) {
  let urlParams = new URLSearchParams( {lat: latitude, lon: longitude, key: weatherbitKey} )
  let response = await fetch(currentWeatherUrl + urlParams.toString())
  try {
    let json = await response.json()
    return json.data[0]
  } catch(err) {
    console.error(err)
  }
}

async function getWeatherForecast(latitude, longitude) {
  let urlParams = new URLSearchParams( {lat: latitude, lon: longitude, key: weatherbitKey} )  
  let response = await fetch(forecastWeatherUrl + urlParams.toString())
  try {
    let json = await response.json()    
    return json.data
  } catch(err) {
    console.error(err)
  }
}

export {
  getCurrentWeather,
  getWeatherForecast
}