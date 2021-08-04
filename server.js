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

    const URL = `${process.env.MOVIE_API_URL}?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    axios.get(URL)
    .then( result =>{
        res.send(utilitiesFuncions.creatMoviesObjList(result.data));
    })
    .catch(err => {
        res.send(err)
    });
});

// const createForcastObj = weatherObjList =>{
//     const forcastObjList = [];
//     weatherObjList.data.map( item => {
//         const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
//         const date = item.datetime;
//         forcastObjList.push(new Forcast(date, description));
//     });
//     return forcastObjList;
// };

// const creatMoviesObjList = moviesObjList => {
//     const newMoviesObjList = [];
//     moviesObjList.results.map(movieObj => {
//         const title = movieObj.title;
//         const overview = movieObj.overview;
//         const averageVotes = movieObj.vote_average;
//         const totalVotes = movieObj.vote_count;
//         const popularity = movieObj.popularity;
//         const releasedOn = movieObj.release_date;
//         const imageUrl = movieObj.poster_path && `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
//         newMoviesObjList.push(new Movies(title, overview, averageVotes, totalVotes, imageUrl, popularity, releasedOn));
//     });

//     return newMoviesObjList;
// } 

// class Erorr {
//     constructor(status, errMsg){
//         this.status = status;
//         this.errMsg = errMsg;
//     }
// }

// class Forcast {
//     constructor(date = '', description =''){
//         this.date = date;
//         this.description = description;  
//     }
// }

// class Movies {
//     constructor(title, overview, averageVotes, totalVotes, imageUrl, popularity, releasedOn){
//         this.title = title;
//         this.overview = overview;
//         this.average_votes= averageVotes;
//         this.total_votes = totalVotes;
//         this.image_url = imageUrl;
//         this.popularity = popularity;
//         this.released_on = releasedOn;
//     }
// }

server.listen(PORT, () => {
    console.log(`I'm listening on port:${PORT}`);
});