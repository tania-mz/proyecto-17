import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/stateContext";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./Card";

const API_KEY = "c84b15de02b182bd760ca972c743c53f"; // Clave de API de TMDb

const TrendingMoviesPreview = (props) => {
  const navigate = useNavigate();
  const [movies, setmovies] = useState([]);

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
        setmovies(res.data.results.slice(index, index + 5));
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
    <Card
      cards={movies}
      nextPage={nextPage}
      previousPage={previousPage}
      setId={setId}
      setSearchType={setSearchType}
      navigate={navigate}
      navto="movies"
      type="movie"
    />
  );
};

export default TrendingMoviesPreview;
