import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../service/api";
import { Link } from "react-router-dom";
import Search from "./Search";

const Movies = () => {
  const [movies, setMovies] = useState([]);

   // Movies search
   const [search, setSearch] = useState("");
   const handleSearch = (query) => {
    setSearch(query);
  };

  const filteredList = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const API = api + "/movies";

    axios
      .get(API)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center" }}>TMDB-The Movie DB</h1>
      <Search handleSearch={handleSearch} />
      <div className="parent">
        {Object.values(filteredList).map((movie, index) => {
          return (
            <div className="item" key={index}>
              {/* <h3>{movie.title}</h3> */}
              {/* <p>{movie.overview}</p> */}
              {/* <p>{movie.release_date}</p> */}
              <Link to={`/movie/${movie.id}`} className="link-to-movie">
                <img
                  className="avatar"
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
