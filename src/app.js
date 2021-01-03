const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { RSA_PKCS1_OAEP_PADDING } = require('constants')

const app = express()
const port = 3000

//Setting Path for Express
const publipath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

 //it is used to set the view engine as hbs to display dynamic page
app.set("view engine","hbs")
app.set("views",viewpath) // Customize the view directory from default (views)==>(Templates)
hbs.registerPartials(partialpath)

//config express server
app.use("/",express.static(publipath))

app.get('',(req,res)=>{
    res.render("index",{
        name:"Created by Ashok",
        title:"Weather App"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Created By Ashok"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        desc:"Contact our chief",
        name:"Created by Ashok"
    })
})
/******************************* INFORMATION FOR REFERENCE **************************************************** */
//get is used to display info when someone accessed the page with URL
//use method in express is used to customize server
//Ex: app.com, app.com/help, app.com/about


// app.get("/help",(req,res)=>{
//     res.send("This is help page...")
// })

// app.get("/about",(req,res)=>{
//     res.send("<h1>This is About page</h1>")
// })
/******************************* INFORMATION FOR REFERENCE **************************************************** */


app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return res.send(
            {
                error:"Please provide the address"
            }
        )
    }
    city = req.query.address
    geocode(city,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                forecast:forecastdata,
                address:city
            })
            // res.send(forecastdata)
        })
           
    })
    // res.send({
    //     forecast:"Its Rainy",
    //     address:req.query.address
    // })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        error:"help Not Found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        error:"Page Not Found"
    })
})



//This content is used to make the server listen to the web request and act to the request using port number..
app.listen(port, ()=>{
    console.log('Server is running at',port)
})