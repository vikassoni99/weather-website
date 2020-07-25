const path = require('path')
const express = require('express')
const app = express()
const hbs=require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

//Defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
//Setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Vikas Soni"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Vikas Soni"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "FAQ",
        title: "Help",
        name: "Vikas Soni"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide address to get weather."
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            res.send([{
                forecast: forecastData,
                location: location,
                address:req.query.address
            }])
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('wildcard',{
        title:"404",
        message:"Help article not found.",
        name:"Vikas Soni"
    })
})

app.get('*',(req,res)=>{
    res.render('wildcard',{
        title:"404",
        message:"404 not found",
        name:"Vikas Soni"
    })
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})