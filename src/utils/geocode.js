const request = require('request')

const getGeoCode = (placename, callback) =>{


    const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(placename) +'.json?access_token=pk.eyJ1Ijoia2luZ2Nob285NSIsImEiOiJja3BtYnN0emUwNG9pMzFtd3lhZ2NkOHdyIn0.ggIos6Of-eVUWS_V9dLn4g'
    request({url: urlMap, json: true},(error, {body}) =>{
        if(error){
            callback({status: false, error: 'Unable to connect to service!'})
        }else if(body.message != null){
            callback({status: false, error: body.message});
        }else if(body.features.length === 0){
            callback({status: false, error:'Unable to find location.Try another search.'})
        }
        else{
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback({
                status: true,
                latitude: latitude,
                longitude:longitude,
                location:location
            })
        }
    })

 }

 const getWeather = (location, callback)=>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(location) +'&appid=8c049f5c7c42913842c24adedcc95fbb';

    request({url: url,json:true},(error,{body})=>{
        console.log(body)
        if(error){
            callback({status: false, error: 'Unable to connect to service!'})
        }else if(body.cod != "200"){
            console.log(body.cod)
            callback({status: false, error: body.message})
        }else{
            // const data = JSON.parse(response.body)
            callback({status: true, weather: body.weather[0].description+'. The high today is '+body.main.temp_max+' fahrenheit and the low today is '+body.main.temp_min+' fahrenheit.'})
        }
    })

 }

 module.exports = {
    getGeoCode: getGeoCode,
    getWeather: getWeather
 }
 