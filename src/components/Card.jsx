import Start from "../assets/rating-star.svg";
import "../styles/Cards.css";

export default function Card({ cards, nextPage, previousPage }) {
  return (
    <div className="main-card-container">
      <div className="card-container">
        <h2>Trending TV Shows Today</h2>
        <div className="card-movie-list">
          {cards.map((card) => (
            <div key={card.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${card.poster_path}`}
                alt={card.name}
                onClick={() => (
                  setId(card.id),
                  setSearchType("tv"),
                  navigate(`/tvShow/${card.id}`)
                )}
              />
              <div className="rating">
                <img src={Start} alt="Start of movie rating" />
                <p>{card.vote_average}</p>
              </div>
              <p>{card.title || card.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-buttons">
        <button className="previousPage trending-preview" onClick={previousPage}>
          previous
        </button>
        <button className="nextPage trending-preview" onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
}
