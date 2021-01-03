const request = require('postman-request')

//------------------------------------------------------------------------------//
 //                        For Reference
 // Geocoding 
    // india --> latitude and longitude...
    // const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/India.json?access_token=pk.eyJ1IjoiYWRhc2hlbGxieSIsImEiOiJja2k4a3Z4M2cwNnBlMnlyb3B3dmpwaDYxIn0.E9vq48hhD5arev5nbRyUEA&limit=1'
    // request({url:url1,json:true},(error,response)=>{
    //     if(error){
    //         console.log("Network Problem bruh!!")
    //     }
    //     else if ((response.body.features).length ==0){
    //         console.log("Invalid Input")
    //     }
    //     else{
    //     const longitude = response.body.features[0].center[0]
    //     const latitude = response.body.features[0].center[1]
    //     console.log("longitude:",longitude,"latitude:",latitude)
    //     }
    // })

//-------------------------********************---------------------------------//


const geocode = (message, callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(message)+ '.json?access_token=pk.eyJ1IjoiYWRhc2hlbGxieSIsImEiOiJja2k4a3Z4M2cwNnBlMnlyb3B3dmpwaDYxIn0.E9vq48hhD5arev5nbRyUEA&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Network Problem bruh!!',undefined)
        }
        else if(body.features.length == 0){
            callback('Invalid Input',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name+'.'
            })
        }
    })
}

module.exports = geocode