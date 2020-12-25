const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'lir lir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'lir lir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'lir lir lir lir',
        name: 'lir lir'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter a valid address'
        })
    }

        geocode(req.query.address, (error, { latitude, longtitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    address: req.query.address  
                })
            })
        })
    }
)

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'lir lir',
        errorMessage: 'Help article not found.',
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'lir lir',
        errorMessage: 'Page not found.',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})