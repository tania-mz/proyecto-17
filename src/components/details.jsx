import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchComponent from "../components/SearchComponent";
import { useStateContext } from '../context/stateContext';
import '../style/details.css';
import { useParams } from 'react-router-dom';

function DetailsId() {
  const [information, setInformation] = useState(null);

  const { type, ID } = useParams();

  const { searchType, setSearchType, query, setQuery, id, setId } = useStateContext();

  useEffect(() => {
    fetchData();
  }, [id]);


  useEffect(() => {
    // Set searchType only if type is defined
    if (type) {
      setSearchType(type);
    }
  }, [type]);

  useEffect(() => {
    if(ID) {
      setId(ID); 
    }
  }, [ID]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${searchType}/${id}`, {
        params: {
          api_key: 'fbd275a080fd3aac51146bb6a6946f33',
          language: 'es'
        }
      });
      setInformation(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w400${path}`;
  };



  return (
    <div className="details">
      <SearchComponent />
      {information && (
        <div className="details-container">
          <div>
            <h1>{information.title || information.name}</h1>
            <img src={getImageUrl(information.poster_path) || getImageUrl(information.profile_path)} alt={information.id} />
            
            <p>{information.overview}</p>
          </div>
          <div className="genres">
          {searchType !== "person" && (<h3>Géneros:</h3>)}
            {information.genres && information.genres.map((genre, index) => (
              <p key={index}>{genre.name}</p>
            ))}

          </div>
          
          {searchType === "person" && (
            <div>
              <h3>Detalles:</h3>
              {information.biography ? <p><strong>Biografía:</strong> {information.biography}</p> : ""}
              {information.birthday ? <p><strong>Fecha de nacimiento:</strong> {information.birthday}</p> : ""}
              {information.deathday ? <p><strong>Fecha de muerte:</strong> {information.deathday}</p> : ""}
              {
                information.also_known_as ? (
                  <div>
                    <h3>Ver más Personas</h3>
                    {information.also_known_as.map((element) => (
                      <p>{element}</p>
                    ))}
                  </div>
                ) : (
                  ""
                )
              }

            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailsId;

