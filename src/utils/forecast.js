const request = require('postman-request')


//---------------------------------------------------------------------//
//                          For Reference

// const url = 'http://api.weatherstack.com/current?access_key=bd67b5750a0bbc8bd1efcad7d38c65e2&query=sivaganga&units=m'

// request({url:url,json:true},(error,response) =>{
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
//     //console.log(response.body.current)
//     if(error){
//         console.log("Network Problem Bruh!!")
//     }
//     else if (response.body.error){
//         console.log("Invalid input")
//     }
//     else{
//     console.log(response.body.current.weather_descriptions[0]+". It is",response.body.current.temperature,"degress out. It feels like",response.body.current.feelslike,"degrees out")

//     }
//     })

//-------------------------------*********************************--------------------------------//

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bd67b5750a0bbc8bd1efcad7d38c65e2&query='+encodeURIComponent(latitude) +','+encodeURIComponent(longitude) +'&units=m'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Network Error Bruh!!",undefined)
        }
        else if(body.error){
            callback("Invalid Input",undefined)
        }
        else{
            // callback(undefined,{
            //     weather_info: response.body.current.weather_descriptions[0],
            //     temp: response.body.current.temperature,
            //     location: response.body.location.region+','+response.body.location.country
            // })
            callback(undefined,body.current.weather_descriptions[0]+". It is "+ body.current.temperature+ " degress. But,It feels like "+ body.current.feelslike+" degrees out. The wind Speed is "+body.current.wind_speed+" Km/hr.")
        }
    })

}

module.exports = forecast