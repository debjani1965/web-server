const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hlbGx5MTIzIiwiYSI6ImNrM2hraW1vNjBhcXcza3BocmlvNXNtc3cifQ.5vGAB7XWj1eZI6Y6qaXtAQ`;
    request({url, json:true}, (error, { body })=>{
        if(error){
            callback("Unable to connect to location services", undefined)
        } else if(body.features.length === 0) {
            callback("No location found", undefined)
        } else {
            const {center, place_name:location} = body.features[0];
            const [longitude, latitute] = center;
            const data = {
                latitute,
                longitude,
                location
            }           
            callback('', data)
        }
    });
}

module.exports = geoCode;