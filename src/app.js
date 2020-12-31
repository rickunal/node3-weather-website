const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Defines Path For Express Config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HandleBars engins and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kunal Dhenge'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kunal Dhenge'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'Page to Helping out people!',
        name: 'Kunal Dhenge'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please Provide Address!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must provide Search tearm!'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help Artical Not Found!',
        name: 'Kunal Dhenge',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Page Not Found',
        name: 'Kunal Dhenge',
        title: '404'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})