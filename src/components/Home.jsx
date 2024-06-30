import SearchComponent from "../components/SearchComponent";
import TrendingMoviesPreview from './TrendingMoviesPreview'
import TrendingTVPreview from './TrendingTVPreview'
import TrendingPeoplePreview from './TrendingPeoplePreview'

import '../css/Home.css'

function Home() {

  return (
    <div className="className">
      <nav>        
        <SearchComponent/>
      </nav>
      <header>
        <h1>Peliculas</h1>
      </header>
      <main>
        <TrendingMoviesPreview 
        start = {2}
        end = {5}/>

        <TrendingTVPreview />
        <TrendingPeoplePreview />
      </main>
    </div>
  )
}

export default Home
