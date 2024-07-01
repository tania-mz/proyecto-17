import TrendingMoviesPreview from "./TrendingMoviesPreview";
import TrendingTVPreview from "./TrendingTVPreview";
import TrendingPeoplePreview from "./TrendingPeoplePreview";

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
