import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//4b603640
const API_URL = "http://www.omdbapi.com?apikey=4b603640"; //will be used to fetch data

const movie1 = {
  Title: "Avengers: Endgame",
  Year: "2019",
  imdbID: "tt4154796",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTc5MjE2ODEyMF5BMl5BanBnXkFtZTcwNzU1NzUzNTE@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]); //leave the default array value to be empty
  const [searchTerm, setSearchTerm] = useState(''); //leave the default value to be empty

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json(); //data will store all the fetched data
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className="app">
      <h1>BingeDose</h1>

      <div className="search">
        <input
          placeholder="search for movies"
          values={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  //jo yahan search krenge
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)}  //ussi ki value yahan show hogi
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (          //gonna store all the movies in the empty array
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">No movies found</div>
      )}
    </div>
  );
};

export default App;
