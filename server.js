'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const data = require('./data/weather.json');
const axios = require('axios');
const utilitiesFuncions = require('./utilities');
const server = express();
const PORT = process.env.PORT;
server.use(cors());

const movieDataInMemory = {};

// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/weather', (req, res) => {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const cityName = req.query.searchQuery.toLocaleLowerCase();
    const URL = `${process.env.WATHER_API_URL}?city=${cityName}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`; 

    axios
    .get(URL)
    .then( result =>{
        res.send(utilitiesFuncions.createForcastObj(result.data));
    })
    .catch(err => {
        console,log(err);
        res.send(err)
    });

});

// http://localhost:3001/movies?cityName=ammn
server.get('/movies',(req, res)=> {
    const cityName = req.query.cityName;

    if(movieDataInMemory[cityName] !== undefined)
        res.send(movieDataInMemory[cityName]);
    else{
        const URL = `${process.env.MOVIE_API_URL}?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
        axios.get(URL)
        .then( result =>{
            const resData = utilitiesFuncions.creatMoviesObjList(result.data)
            movieDataInMemory[cityName] = resData;
            res.send(resData);
        })
        .catch(err => {
            res.send(err)
        });
    }
});

server.listen(PORT, () => {
    console.log(`I'm listening on port:${PORT}`);
});