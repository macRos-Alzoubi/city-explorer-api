class Movies {
    constructor(title, overview, averageVotes, totalVotes, imageUrl, popularity, releasedOn){
        this.title = title;
        this.overview = overview;
        this.average_votes= averageVotes;
        this.total_votes = totalVotes;
        this.image_url = imageUrl;
        this.popularity = popularity;
        this.released_on = releasedOn;
    }
}

module.exports = Movies;