import React, { useState, useEffect } from 'react';
import '../css/ResultsPage.css';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/stateContext';

function ResultsPage() {
    const navigate = useNavigate();
    const { searchType, setSearchType  } = useStateContext();
    const { query, setQuery } = useStateContext();
    const { id, setId } = useStateContext();
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Fetch movies based on the user's search query
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/${searchType}?api_key=fbd275a080fd3aac51146bb6a6946f33&query=${query}&page=${page}`
                );
                const data2 = await response.json();
                setData(data2.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [index, page, searchType, query]);

    const changePage = () => {
        console.log("page: ", page, "index: ", index)
        if (index === 0) {
          setIndex(index + 10);
        }else{
          setPage(page + 1);
        }
    };


    const newData = data.slice(index, index + 10);
    return (
        <div className="">
        <div className="Container">
            <div className="Movie">
                {newData.map((element) => (
                    <div key={element.id} className="">
                        <img className="movie-images"
                            src={`https://image.tmdb.org/t/p/w300${element.poster_path}` + `https://image.tmdb.org/t/p/w300${element.profile_path}` }
                            alt={element.title}
                            onClick={() => (setId(element.id), navigate(`/id/${type}/${element.id}`))}
                        />
                          <div className="info-container">
                              <h3>{element.title}</h3>
                              <p>{element.release_date}</p>
                          </div>
                        <p className="title">{element.title}</p>
                    </div>
                ))}
            </div>
        </div>
                    
        <button className="" onClick={changePage}>next</button>
        </div>

    );
}



export default ResultsPage;
