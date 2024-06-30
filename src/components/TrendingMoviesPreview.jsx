import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../context/stateContext';
import { useNavigate } from 'react-router-dom';

import '../style/sectionCard.css'; // Asegúrate de importar el archivo CSS

const API_KEY = 'c84b15de02b182bd760ca972c743c53f'; // Clave de API de TMDb

const TrendingMoviesPreview = (props) => {
  const navigate = useNavigate();
  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { searchType, setSearchType  } = useStateContext();
  const { query, setQuery } = useStateContext();
  const { id, setId } = useStateContext();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`);
        setMovies1(res.data.results.slice(index, index+5)); 
        setMovies2(res.data.results.slice(index+5, index+10));// Limitar el número de películas a 5  // AQUI DECIA (props.start, props.end) EN VEZ DE (0, 8)
        //console.log(res.data.results.slice(0, 5))
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchMovies();
  }, [index, page])

  const changePage = () => {
    if (index === 0) {
      setIndex(index + 10);
    }else{
      setPage(page + 1);
    }
  };

  return (
    <div id="trendingPreview">
      <div className="trendingPreview-container">
        <h2 >Trending Movies Today</h2>
        <div className="trendingPreview-movieList">
          {movies1.map((movie) => (
            <div key={movie.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => (setId(movie.id), setSearchType('movie'), navigate(`/id/movies/${movie.id}`))}
              />
              <p>{movie.title}</p>
              <p>{movie.vote_average}</p>
            </div>
          ))}
        </div> 
        
        <div className="trendingPreview-movieList">
            {movies2.map((movie) => (
              <div key={movie.id} className="movie-container">
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                  alt={movie.title}
                  onClick={() => (setId(movie.id), setSearchType('movie'), navigate(`/id/movies/${movie.id}`))}
                />
                <p>{movie.title}</p>
                <p>{movie.vote_average}</p>
              </div>
            ))}
          </div>
      </div>
      <button className="" onClick={changePage}>next</button>
    </div>
  );
};

export default TrendingMoviesPreview;
