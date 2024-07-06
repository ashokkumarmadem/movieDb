import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MoviesCard from '../MoviesCard'
import Header from '../Header'
import './index.css'
import SearchContext from '../../context/SearchContext'

class SearchResults extends Component {
  state = {searchList: [], isLoading: true}

  getSearchResults = async input => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${input}&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({searchList: updatedData, isLoading: false})
    }
  }

  displayLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  displaySearchResults = () => {
    const {searchList} = this.state
    return (
      <>
        {searchList.length === 0 ? (
          <p className="no-view">
            No Results to display. Try search other keywords
          </p>
        ) : (
          <ul className="movies-list-container">
            {searchList.map(each => (
              <MoviesCard key={each.id} details={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput} = value
          this.getSearchResults(searchInput)
          return (
            <>
              <Header />
              <div className="search-results-container">
                {isLoading ? this.displayLoader() : this.displaySearchResults()}
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default SearchResults
