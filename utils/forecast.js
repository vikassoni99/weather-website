const request = require('request')
//WeatherBit
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?&lat=' + latitude + '&lon=' + longitude + '&key=2686e69c11f34810a6155d7796436e6e'
    request({ url: url, json: true }, (error, response) => {
        // const raw= JSON.parse(response.body)
        // console.log(raw.data[0].temp)
        if (error) {
            callback("Error connecting to weather services.", undefined)
        } else {
            callback(undefined, response.body.data[0].temp)
        }
    })
}

module.exports = forecast