import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSearchResults } from "../service/TmdbApi";
import { useStateContext } from "../context/stateContext";
import logo from "../assets/imdb.png";

import "../styles/SearchBar.css";

const SearchComponent = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // const searchParams = new URLSearchParams(location.search);
  const { type, search } = useParams();

  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { searchType, setSearchType, query, setQuery, id, setId } =
    useStateContext();

  useEffect(() => {
    // Set searchType only if type is defined
    if (type) {
      setSearchType(type);
    }
  }, [type]);

  useEffect(() => {
    setQuery(search); // Assuming 'search' contains the ID value
  }, [search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchSearchResults(searchType, query)
          .then((data) => {
            setResults(data.results.slice(0, 5)); // Limitamos a 5 resultados para el dropdown
          })
          .catch((error) => console.error("Error fetching results:", error));
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchType]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    setShowDropdown(false);
    navigate(`/search/${searchType}/${query}`);
  };

  const handleResultClick = (result) => {
    setQuery(result.title || result.name);
    setShowDropdown(false);

    setId(result.id);
    navigate(`/${searchType}/${result.id}`);
  };
  return (
    <div className="search-container">
      <Link to="/">
        <img className="logo" src={logo} alt="IMDb" />
      </Link>
      <form onSubmit={handleSearch}>
        <div>
          <select
            className="select-button"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="movie">Películas</option>
            <option value="tv">TV Shows</option>
            <option value="person">Personas</option>
          </select>
        </div>
        <div className="input-button-container">
          <input
            className="input-search"
            type="text"
            value={query}
            onChange={(e) => (setQuery(e.target.value), setShowDropdown(true))}
            placeholder="Buscar..."
          />
          <button className="submit-button" type="submit">
            Buscar
          </button>
        </div>
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((result) => (
            <li key={result.id} onClick={() => handleResultClick(result)}>
              <img
                className="a"
                src={
                  `https://image.tmdb.org/t/p/w200${result.poster_path}` +
                  `https://image.tmdb.org/t/p/w200${result.profile_path}`
                }
                alt={result.title}
              />{" "}
              {result.title || result.name}
              {searchType === "person" &&
                result.known_for_department &&
                ` - ${result.known_for_department}`}
              {(searchType === "movie" || searchType === "tv") &&
                result.release_date &&
                ` (${result.release_date.split("-")[0]})`}
              {(searchType === "movie" || searchType === "tv") &&
                result.first_air_date &&
                ` (${result.first_air_date.split("-")[0]})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
