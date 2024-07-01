import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/stateContext";
import { useNavigate, useParams } from "react-router-dom";
import Start from '../assets/rating-star.svg'

import "../styles/sectionCard.css"; // Asegúrate de importar el archivo CSS

const API_KEY = "c84b15de02b182bd760ca972c743c53f"; // Clave de API de TMDb

const TrendingMoviesPreview = (props) => {
  const navigate = useNavigate();
  const [movies1, setMovies1] = useState([]);

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { searchType, setSearchType, query, setQuery, id, setId } =
    useStateContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
        );
        setMovies1(res.data.results.slice(index, index + 5));
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchMovies();
  }, [index, page]);

  // Funcion para mostrar los 10 resultados siguientes
  const nextPage = () => {
    if (index === 0) {
      setIndex(index + 10);
    } else {
      setPage(page + 1);
      setIndex(0);
    }
  };

  // Funcion para mostrar los 10 resultados anteriores
  const previousPage = () => {
    if (page === 1 && index === 0) {
      return;
    } else if (index === 10) {
      setIndex(index - 10);
    } else {
      setPage(page - 1);
      setIndex(10);
    }
  };

  return (
    <div id="trendingPreview">
      <div className="trendingPreview-container">
        <h2>Trending Movies Today</h2>
        <div className="trendingPreview-movieList">
          {movies1.map((movie) => (
            <div key={movie.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => (
                  setId(movie.id),
                  setSearchType("movie"),
                  navigate(`/movies/${movie.id}`)
                )}
              />
              <div className="rating">
                <img src={ Start } alt="Start of movie rating"/>
                <p>{movie.vote_average}</p>
              </div>
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="nextPage" onClick={nextPage}>
        next
      </button>
      <button className="previousPage" onClick={previousPage}>
        previous
      </button>
    </div>
  );
};

export default TrendingMoviesPreview;
