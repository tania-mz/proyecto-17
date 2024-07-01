import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/sectionCard.css'; // Asegúrate de importar el archivo CSS
import { useStateContext } from '../context/stateContext';
import { useNavigate, useParams } from 'react-router-dom';

const API_KEY = 'c84b15de02b182bd760ca972c743c53f'; // Recuerda reemplazar 'tu_api_key' con tu clave de API de TMDb

const TrendingPeoplePreview = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const { searchType, setSearchType, query, setQuery, id, setId } = useStateContext();

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=${API_KEY}&page=${page}`);
        setPeople(res.data.results.slice(index, index+5)); // Limitar el número de personas a 5
      } catch (error) {
        console.error('Error fetching trending people:', error);
      }
    };

    fetchPeople();
  }, [index, page]);

  // Funcion para mostrar los 10 resultados siguientes
  const nextPage = () => {
    if (index === 0) {
      setIndex(index + 10);
    }else{
      setPage(page + 1);
      setIndex(0);
    }
  };

  // Funcion para mostrar los 10 resultados anteriores
  const previousPage = () => {
    if (page === 1 && index === 0) {
      return;
    }
    else if (!(index === 0)) {
      setIndex(index - 5);
    }else{
      setPage(page - 1);
      setIndex(15);
    }
  };

  return (
    <div id="trendingPeoplePreview">
      <div className="trendingPreview-container">
        <h2 >Trending People Today</h2>
        <div className="trendingPreview-movieList">
          {people.map((person) => (
            <div key={person.id} className="persson-container">
              <img
                className="persson-img"
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                onClick={() => (setId(person.id), setSearchType('person'), navigate(`/person/${person.id}`))}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="nextPage" onClick={nextPage}>next</button>
      <button className="previousPage" onClick={previousPage}>previous</button>
    </div>
  );
};

export default TrendingPeoplePreview;

