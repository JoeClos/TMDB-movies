import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../service/api";

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const API_CALL = api + `/movie/${movieId}`;

    axios
      .get(API_CALL)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
      });
  }, [movieId]);

  if (movie === undefined) {
    return (
      <div style={{ color: "white", backgroundColor: "white" }}>
        {error || "Loading"}{" "}
      </div>
    );
  }

  return (
    <div className="container" style={{ color: "white" }}>
      <div style={{ textAlign: "center" }}>
        <h1>{movie.title}</h1>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <h5>TAGS:</h5>
          {movie.genres &&
            movie.genres.map((m) => <h5 key={m.id}>#{m.name}</h5>)}
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <br />
        <Link to={`/`}>Back to list</Link>
      </div>
      <h5>{movie.overview}</h5>
      <div>
        <p>Release: {movie.release_date}</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <p>Production countries:</p>
          {movie.production_countries &&
            movie.production_countries.map((c, index) => <p key={index}>{c.name}</p>)}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <p>Subtitle:</p>
          {movie.spoken_languages &&
            movie.spoken_languages.map((l, index) => <p key={index}>{l.english_name}</p>)}
        </div>
      </div>
    </div>
  );
};

export default Movie;
