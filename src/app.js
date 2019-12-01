const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const app = express();
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

/*Define path for Express config*/
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

/*Set view*/
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialPath);
/*Set static path*/
app.use(express.static(publicDirectoryPath));

/*Routing*/
app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : "Debjani Sen"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : "Debjani Sen"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: "This is some helpful text",
        title : 'Help',
        name : "Debjani Sen"
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404 Page',
        name : "Debjani Sen",
        errorMessage : "Help article not found"
    });
});

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if(!address) {
        return res.send({
            error : 'Please mention address'
        })
    }
    geoCode(address, (error, {latitute, longitude, location} = {}) => {
        if(error) return res.send({ error });   
        foreCast(latitute, longitude, (error, forecast) => {
            if(error) return res.send({ error });           
            if(res){
                res.send({location,forecast})
            }            
        })
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title : '404 Page',
        name : "Debjani Sen",
        errorMessage : "Page not found"
    });
});

/* Start server*/
app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})