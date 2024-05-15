const express = require("express");
const app = express();
const movieData = require("./Movie_Data/data.json");
const axios = require("axios");
require("dotenv").config();
const readline = require("readline");

function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

app.get("/", (req, res) => {
    let movieArray = [];
    movieData.map((item) => {
        let singleMovie = new Movie(item.title, item.poster_path, item.overview);
        movieArray.push(singleMovie);
    });
    res.send(movieArray);
});

app.get("/favourite", (req, res) => {
    res.send("<h1>Welcome to Favourite Page</h1>");
});

app.get("/trending", trendingPageHandler);
app.get("/search", searchPageHandler);
app.get("/now_playing",nowPlayingPageHandler);
app.get("/upcoming",upcomingPageHandler);

function trendingPageHandler(req, res) {
    const apiKey = process.env.API_Key;
    let trendingEndpoint = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    let arrayOfSpecificInformationMovies = [];
    axios.get(trendingEndpoint)
        .then(trendingResponse => {
            trendingResponse.data.results.map(specificInformationMovie => {
                let newMovie = new Movie(specificInformationMovie.title, specificInformationMovie.poster_path, specificInformationMovie.overview);
                arrayOfSpecificInformationMovies.push(newMovie);
            });
            res.send(arrayOfSpecificInformationMovies);
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

function searchPageHandler(req, res) {
    const movieNameToSearchFor = req.query.movie;
    const apiKey = process.env.API_Key;
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(movieNameToSearchFor)}&page=1`)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

function nowPlayingPageHandler(req,res){
    const apiKey = process.env.API_Key;
    let nowPlayingEndpoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`;
    let arrayOfSpecificInformationMovies = [];
    axios.get(nowPlayingEndpoint)
        .then(Response => {
                Response.data.results.map(specificInformationMovie => {
                let newMovie = new Movie(specificInformationMovie.title, specificInformationMovie.poster_path, specificInformationMovie.overview);
                arrayOfSpecificInformationMovies.push(newMovie);
            });
            res.send(arrayOfSpecificInformationMovies);
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

function upcomingPageHandler(req,res){
    const apiKey = process.env.API_Key;
    let nowPlayingEndpoint=`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
    let arrayOfSpecificInformationMovies = [];
    axios.get(nowPlayingEndpoint)
        .then(Response => {
                Response.data.results.map(specificInformationMovie => {
                let newMovie = new Movie(specificInformationMovie.title, specificInformationMovie.poster_path, specificInformationMovie.overview);
                arrayOfSpecificInformationMovies.push(newMovie);
            });
            res.send(arrayOfSpecificInformationMovies);
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found!</h1>");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("<h1>Sorry, Something went Wrong!</h1>");
});

const port = 7777;
app.listen(port, () => {
    console.log("Server is running at port 7777");
});