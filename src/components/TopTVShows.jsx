import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/stateContext";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./Card";

const API_KEY = "c84b15de02b182bd760ca972c743c53f"; // Recuerda reemplazar 'tu_api_key' con tu clave de API de TMDb

/* componente */
const TrendingTVPreview = () => {
  const navigate = useNavigate();
  const [tvShows, settvShows] = useState([]);
  const { searchType, setSearchType, query, setQuery, id, setId } =
    useStateContext();

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    /* Debe recibir el código para ejecutar y la lista de dependencias   //como minimo se ejecuta una vez*/

    console.log;
    const fetchTvShows = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&page=${page}`
        );
        settvShows(res.data.results.slice(index, index + 5));
      } catch (error) {
        console.error("Error fetching trending TV shows:", error);
      }
    };

    fetchTvShows();
  }, [
    index,
    page,
  ]); /* Este array se pasa de forma opcional, si no se le pasa el código dentro de useEffect se va a ejecutar cada que se renderice el componente*/

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
    <Card cards={tvShows} nextPage={nextPage} previousPage={previousPage} />
  );
};

export default TrendingTVPreview;
