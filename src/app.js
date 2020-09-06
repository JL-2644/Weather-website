// express is a function rather than an object
const path = require("path");
const express = require('express');
const hbs = require('hbs');
const { response } = require("express");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// make heroku listen on the port
const port = process.env.PORT || 3000;
// defines paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// hbs - handlebars
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    // render for hbs, send for html
    res.render('index', {
        title: 'Weather',
        name: "JiaQi Li"
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'JiaQi Li'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        contact: 'This is help support',
        email: 'no email',
        title: "Help",
        name: "JiaQi Li"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "An address must be provided"
        })
    }
    //geocoding
    // Address => Lat/Long
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        try{
            // Call-back chaining
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error   
                    });
                }
                
                res.send({
                    location,
                    forecastData,
                    address: req.query.address
                })
            });
        }
        catch(error) {
            return res.send({
                error
            });
        }
    });
});

app.get('/products', (req,res) => {
    if (!req.query.search) {
        // As there can only be one res sent and req received
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404 page",
        name: "JiaQi Li",
        msg: "Help article not found"
    });
});

// has to be last
app.get('*', (req,res) => {
    res.render('404', {
        title: "404 page",
        name: "JiaQi Li",
        msg: "Page not found"
    });
});

// start the server
app.listen(port, () => {
    console.log('Server is up at port ' + port );
});
