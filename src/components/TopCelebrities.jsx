import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/stateContext";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/Celebrities.css";

const API_KEY = "c84b15de02b182bd760ca972c743c53f"; // Recuerda reemplazar 'tu_api_key' con tu clave de API de TMDb

const TrendingPeoplePreview = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const { searchType, setSearchType, query, setQuery, id, setId } =
    useStateContext();

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/person/day?api_key=${API_KEY}&page=${page}`
        );
        setPeople(res.data.results.slice(index, index + 4)); // Limitar el número de personas a 5
      } catch (error) {
        console.error("Error fetching trending people:", error);
      }
    };

    fetchPeople();
  }, [index, page]);

  // Funcion para mostrar los 10 resultados siguientes
  const nextPage = () => {
    if (index === 0) {
      setIndex(index + 4);
    } else {
      setPage(page + 1);
      setIndex(0);
    }
  };

  // Funcion para mostrar los 10 resultados anteriores
  const previousPage = () => {
    if (page === 1 && index === 0) {
      return;
    } else if (!(index === 0)) {
      setIndex(index - 4);
    } else {
      setPage(page - 1);
      setIndex(4);
    }
  };

  return (
    <div className="main-card-container">
      <div className="card-container">
        <h2>Trending People Today</h2>
        <div className="card-celebrity-list">
          {people.map((person) => (
            <div key={person.id} className="celebrity-container">
              <img
                className="persson-img"
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                onClick={() => (
                  setId(person.id),
                  setSearchType("person"),
                  navigate(`/person/${person.id}`)
                )}
              />
              <h3>{person.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="card-buttons">
        <button
          className="previousPage trending-preview"
          onClick={previousPage}
        >
          previous
        </button>
        <button className="nextPage trending-preview" onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export default TrendingPeoplePreview;
