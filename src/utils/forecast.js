const request = require("request");

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=478e4b63a20a08daee40dab25be57efe&query=" + long + "," + lat + "&units=m";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the Geoservice Api!', undefined)
        } else if (body.error) {
            callback('Unable to find location!!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast