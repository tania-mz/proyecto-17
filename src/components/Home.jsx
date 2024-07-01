import TrendingMoviesPreview from "./TopMovies";
import TrendingTVPreview from "./TopTVShows";
import TrendingPeoplePreview from "./TopCelebrities";

function Home() {
  return (
    <div className="className">
      <main>
        <TrendingMoviesPreview start={2} end={5} />
        <TrendingTVPreview />
        <TrendingPeoplePreview />
      </main>
    </div>
  );
}

export default Home;
