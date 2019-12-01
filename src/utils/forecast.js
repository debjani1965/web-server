const request = require('request');
const ftoc = require('./ftoc');

const foreCast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/da8ca69f3db039eb9f06060e3a895385/${lat},${lon}`;
    
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback(error, undefined)
        } else if(body.code === 400) {
            callback("Error in latitue and longitude", undefined)
        } else {
            let {daily,currently} = body; 
            let {temperature, precipProbability} = currently;
            let {summary} = daily
            let data = summary+` It is currently ${ftoc(temperature)} degree centigrade out and there is ${precipProbability}% chance of rain`;
            callback('', data)
        }
    });
}

module.exports = foreCast;