import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/stateContext";
import "../styles/Details.css";
import { useParams, useNavigate } from "react-router-dom";
import Star from "../assets/rating-star.svg"; // Asegúrate de que la ruta sea correcta

function DetailsId() {
  const [information, setInformation] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { type, ID } = useParams();
  const navigate = useNavigate();
  const { searchType, setSearchType, id, setId } = useStateContext();

  useEffect(() => {
    if (ID) {
      setId(ID);
    }
  }, [ID]);

  useEffect(() => {
    if (type) {
      setSearchType(type);
    }
  }, [type]);

  useEffect(() => {
    if (id) {
      fetchData();
      fetchRecommendations();
    }
  }, [id, index, page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${searchType}/${id}`,
        {
          params: {
            api_key: "fbd275a080fd3aac51146bb6a6946f33",
            language: "es",
          },
        }
      );
      setInformation(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${searchType}/${id}/similar`,
        {
          params: {
            api_key: "fbd275a080fd3aac51146bb6a6946f33",
            language: "es",
            page,
          },
        }
      );
      setRecommendations(res.data.results.slice(index, index + 4));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const nextPage = () => {
    if (index === 0) {
      setIndex(index + 4);
    } else {
      setPage(page + 1);
      setIndex(0);
    }
  };

  const previousPage = () => {
    if (page === 1 && index === 0) {
      return;
    } else if (index === 4) {
      setIndex(index - 4);
    } else {
      setPage(page - 1);
      setIndex(4);
    }
  };

  const getImageUrl = (path) => {
    if (!path) {
      return "";
    }
    return `https://image.tmdb.org/t/p/w400${path}`;
  };

  return (
    <div className="details">
      {information && (
        <div className="details-container">
          <div className="image-container">
            <img
              src={
                getImageUrl(information.poster_path) ||
                getImageUrl(information.profile_path)
              }
              alt={information.id}
            />
          </div>
          <div className="info-container">
            <h1>{information.title || information.name}</h1>
            <div className="genres">
              {searchType !== "person" && <h3>Géneros:</h3>}
              {information.genres &&
                information.genres.map((genre, index) => (
                  <p key={index}>{genre.name}</p>
                ))}
            </div>
            <div className="rating">
              {[...Array(Math.round(information.vote_average || 0)).keys()].map(
                (i) => (
                  <img key={i} src={Star} alt="Star of movie rating" />
                )
              )}
              <p>{information.vote_average || "N/A"}</p>
            </div>
            <div className="description">
              <p>{information.overview}</p>
            </div>
            {searchType === "person" && (
              <div>
                <h3>Detalles:</h3>
                {information.biography ? (
                  <p>
                    <strong>Biografía:</strong> {information.biography}
                  </p>
                ) : (
                  ""
                )}
                {information.birthday ? (
                  <p>
                    <strong>Fecha de nacimiento:</strong> {information.birthday}
                  </p>
                ) : (
                  ""
                )}
                {information.deathday ? (
                  <p>
                    <strong>Fecha de muerte:</strong> {information.deathday}
                  </p>
                ) : (
                  ""
                )}
                {information.also_known_as ? (
                  <div>
                    <h3>Ver más Personas</h3>
                    {information.also_known_as.map((element, index) => (
                      <p key={index}>{element}</p>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="card-container">
        <h3>Recomendaciones</h3>
        <div className="card-movie-list">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${recommendation.backdrop_path}`}
                alt={recommendation.title}
                onClick={() => (
                  setId(recommendation.id),
                  setSearchType(searchType),
                  navigate(`/${searchType}/${recommendation.id}}`)
                )}
              />
              <p>{recommendation.title}</p>
              <p>{recommendation.vote_average}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-buttons">
        <button className="previous-page trending-preview" onClick={previousPage}>
          previous
        </button>
        <button className="next-page trending-preview" onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
}

export default DetailsId;


      