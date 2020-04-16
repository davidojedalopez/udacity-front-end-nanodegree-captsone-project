const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

console.log(__dirname)

let latestTrip = {}

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/latestTrip', getLatestTrip)
function getLatestTrip(req, res) {
    if(latestTrip.placename) {
        res.json({trip: latestTrip})
    } else {
        res.json({})
    }
}

app.post('/save', saveTrip)
function saveTrip(req, res) {    
    let { placename, start, end } = req.body
    latestTrip = {
        placename,
        start,
        end
    }    
    res.json({trip: latestTrip})
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})