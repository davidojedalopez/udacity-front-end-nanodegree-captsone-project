var path = require('path')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')

const bodyParser = require('body-parser')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})