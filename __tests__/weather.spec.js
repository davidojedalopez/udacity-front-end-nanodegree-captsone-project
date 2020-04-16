import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import { getCurrentWeather } from "../src/client/js/weather"
const json = require('./mocks/weather.json')

describe('Weatherbit API', () => {  

  test("Should return current weather", () => {    
    global.Client = {}
    global.Client.getCurrentWeather = () => {
      return { weather: {} }
    }
    fetch.mockResponse(JSON.stringify(json))
    
    expect(getCurrentWeather(1, 2)).toBeDefined()
  })
})