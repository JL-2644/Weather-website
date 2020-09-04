const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bfe88d59248f37cd1fb72ff73ea2e30d&query=' + lat + ',' + long;
   
    request({ url, json: true}, (error, {body} = {}) => {
        
        if(error) {
            callback("Unable to connect to weather service", undefined);
        }
        else if(body.error) {
            callback("Unable to find location", undefined);
        }
        else {
           const {weather_descriptions: weather, temperature, feelslike} = body.current;
           callback(undefined, weather[0]+ ". It is currently " 
            + temperature + " degrees out. It feels like " + feelslike+ 
            " degrees out.");
        }
    });
}

module.exports = forecast;