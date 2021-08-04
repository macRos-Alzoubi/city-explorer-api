
const Forcast = require('./weather');
const Movies = require('./movies');

const utilityFuncionsObj= {};

utilityFuncionsObj.createForcastObj = weatherObjList =>{
    const forcastObjList = [];
    weatherObjList.data.map( item => {
        const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        const date = item.datetime;
        forcastObjList.push(new Forcast(date, description));
    });
    return forcastObjList;
};

utilityFuncionsObj.creatMoviesObjList = moviesObjList => {
    const newMoviesObjList = [];
    moviesObjList.results.map(movieObj => {
        const title = movieObj.title;
        const overview = movieObj.overview;
        const averageVotes = movieObj.vote_average;
        const totalVotes = movieObj.vote_count;
        const popularity = movieObj.popularity;
        const releasedOn = movieObj.release_date;
        const imageUrl = movieObj.poster_path && `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
        newMoviesObjList.push(new Movies(title, overview, averageVotes, totalVotes, imageUrl, popularity, releasedOn));
    });

    return newMoviesObjList;
} 


module.exports = utilityFuncionsObj;