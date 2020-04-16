import { handleSubmit } from './js/app'
import { saveTrip, getLatestTrip } from './js/trip'
import { getPlace } from './js/places'
import { getCurrentWeather, getWeatherForecast } from './js/weather'
import { getPlaceImages } from './js/photos'
import { addWeather, addForecast, addPhotos } from './js/DOMFormatter'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/results.scss'
import './styles/animation.scss'
import './styles/weather.scss'
import './styles/photos.scss'

export {
    handleSubmit,
    saveTrip,
    getLatestTrip,
    getPlace,
    getCurrentWeather,
    getWeatherForecast,
    getPlaceImages,
    addWeather, 
    addForecast, 
    addPhotos
}