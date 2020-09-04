const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFtZXN0aW1vdGh5IiwiYSI6ImNrY2ZtOHZlbjBqangyeXFncmU0c2h6eWgifQ.pFAVZ7sADNLEwq5yfO52sw&limit=1';

    request({url, json:true }, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to locatiuon services', undefined);
        }
        else if(body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
           const {center: [longitude, latitude], place_name} = body.features[0];
           callback(undefined, {
                latitude,
                longitude,
                location: place_name
           })
        }
    });
}

module.exports = geocode;