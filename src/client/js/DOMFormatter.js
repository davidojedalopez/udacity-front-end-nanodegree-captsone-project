function addWeather(weather, container) {
  if(!weather) {
    return
  }

  let header = document.createElement('h2')
  header.innerText = 'Today'
  
  container.insertAdjacentElement('beforebegin', header)

  addWeatherElement(weather, container)
}

function addForecast(forecast, container) {
  let fragment = document.createDocumentFragment()

  let header = document.createElement('h2')
  header.innerText = 'Forecast'
  container.insertAdjacentElement('beforebegin', header)

  let dayForecast
  for(let weather of forecast) {
    dayForecast = document.createElement('div')
    dayForecast.classList.add('day-forecast')
        
    let dateElm = document.createElement('h3') 
    dateElm.innerText = weather.valid_date
    dayForecast.appendChild(dateElm)

    fragment.appendChild(
      addWeatherElement(weather, dayForecast)
    )
  }

  container.appendChild(fragment)
}

function addPhotos(photos) {
  let fragment = document.createDocumentFragment()  

  let photosToShow = photos.hits.slice(0, 10)
  for(let photo of photosToShow) {
    let figure = document.createElement('figure')        

    let img = document.createElement('img')
    img.src = photo.webformatURL  
    img.classList.add('photo')

    let caption = document.createElement('figcaption')
    caption.innerHTML = `Author: <a href="${photo.pageURL}" target="_blank" rel="noopener">${photo.user}</a>`
    
    figure.appendChild(img)
    figure.appendChild(caption)
    fragment.appendChild(figure)
  }

  document.querySelector('.photos').appendChild(fragment)
}

function addWeatherElement(weather, container) {
  let temperature = document.createElement('p')
  temperature.innerText = `${weather.temp} °C`
  container.appendChild(temperature)  

  let img = document.createElement('img')  
  img.src = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`  
  img.classList.add('weather-icon')  
  container.appendChild(img)

  let description = document.createElement('p')
  description.innerText = `${weather.weather.description}`
  container.appendChild(description)

  return container
}

export {
  addWeather,
  addForecast,
  addPhotos
}