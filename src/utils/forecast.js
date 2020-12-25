const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=911d8895f0f1c598b0e101f582160223&query='
    + latitude + ',' + longtitude + '&units=m'

     request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) { 
            callback('Not a valid location!', undefined)
        } else {
            callback(undefined, 'It is ' + body.current.temperature + ' degrees, and feels like '
                + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast