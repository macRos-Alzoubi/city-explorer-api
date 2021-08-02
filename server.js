'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const data = require('./data/weather.json');
const server = express();
const PORT = process.env.PORT;
server.use(cors());


// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/weather', (req, res) => {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const cityName = req.query.searchQuery.toLocaleLowerCase();
    
    console.log(lat, lon, cityName);
    const result = data.find(item => item.lat === lat && item.lon === lon &&  item.city_name.toLocaleLowerCase() === cityName ? item : '');

    result ? res.send(createForcastObj(result)) : res.status(500).send('Something went wrong!');

});


const createForcastObj = (weatherObj) =>{
    const forcastObjList = [];
    weatherObj.data.map( item => {
        const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        const date = item.datetime;
        forcastObjList.push(new Forcast(date, description));
    });
    return forcastObjList;
};


class Forcast {
    constructor(date = '', description =''){
        this.date = date;
        this.description = description;  
    }
}


server.listen(PORT, () => {
    console.log(`I'm listening on port:${PORT}`);
});