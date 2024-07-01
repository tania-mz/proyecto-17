import SearchComponent from "../components/SearchComponent";
import TrendingMoviesPreview from './TrendingMoviesPreview'
import TrendingTVPreview from './TrendingTVPreview'
import TrendingPeoplePreview from './TrendingPeoplePreview'

import '../style/sectionCard.css'

function Home() {

  return (
    <div className="className">
      <nav>        
        <SearchComponent/>
      </nav>
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
