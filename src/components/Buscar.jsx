import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/buscar.css';

const API_KEY = 'c84b15de02b182bd760ca972c743c53f'; // Recuerda reemplazar 'tu_api_key' con tu clave de API de TMDb

const Buscar = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

  // Función para buscar películas basadas en el término de búsqueda
  const fetchMovies = async (query) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      setMovies(res.data.results); // Almacenar los resultados de la búsqueda
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // useEffect para disparar la búsqueda cada vez que el término de búsqueda cambie
  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm); // si no esta vacio llama a fetchMovies
    } else {
      setMovies([]); // Limpiar resultados cuando no hay término de búsqueda
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Actualiza el término de búsqueda con el valor actual del input
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm} // Enlaza el estado al valor del input
        onChange={handleInputChange} // Llama a handleInputChange en cada cambio del input
        placeholder="Search for a movie..."
        className="styled-input"
      />
      <div className="opciones-busqueda">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-container">
            <img
              className="movie-img"
              src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
              alt={movie.title}
            />
            <p>{ movie.title }</p>
            <p>{ movie.vote_average }</p>
          </div>
        ))}
      </div>
      
        {/* <button onClick={anteriorTestimonio}>Anterior</button>
        <button onClick={siguienteTestimonio}>Siguiente</button> */}
      
    </div>
  );
};

export default Buscar;
