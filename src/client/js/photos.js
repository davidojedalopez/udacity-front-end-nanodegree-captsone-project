const pixabayKey = '16023518-f0a4e880e3e85a87dd3a3e2ee'
const pixabayUrl = 'https://pixabay.com/api/?'

async function getPlaceImages(placename) {
  let urlParams = new URLSearchParams( {q: placename, key: pixabayKey, image_type: 'photo', category: 'places', safesearch: true, orientation: 'horizontal' } )    
  let response = await fetch(pixabayUrl + urlParams.toString())
  try {
    return await response.json()    
  } catch(err) {
    console.error(err)
  }
}

export {
  getPlaceImages
}