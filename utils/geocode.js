const request = require('request')
//MapBox
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmlrYXNzb25pIiwiYSI6ImNrY3Uzb2h2OTI0bzQyeWx1aXd3MG93aXQifQ.2WP07gvKsliLJxh-uHvHrQ&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Error connecting weather services", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode