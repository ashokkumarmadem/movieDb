import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MoviesCard from '../MoviesCard'

class UpComing extends Component {
  state = {upcomingList: [], isLoading: true, pageCount: 1}

  componentDidMount() {
    this.getUpComingMovieDetails()
  }

  getUpComingMovieDetails = async () => {
    const {pageCount} = this.state
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageCount}`
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
      this.setState({upcomingList: updatedData, isLoading: false})
    }
  }

  getLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickPrevBtn = () => {
    const {pageCount} = this.state
    if (pageCount > 2) {
      this.setState(
        prev => ({pageCount: prev.pageCount - 1}),
        this.getUpComingMovieDetails,
      )
    } else {
      this.setState({pageCount: 1}, this.getUpComingMovieDetails)
    }
  }

  onClickNextBtn = () => {
    const {pageCount} = this.state
    if (pageCount <= 500) {
      this.setState(
        prev => ({pageCount: prev.pageCount + 1}),
        this.getUpComingMovieDetails,
      )
    } else {
      this.setState({pageCount: 500}, this.getUpComingMovieDetails)
    }
  }

  getMovieDetails = () => {
    const {upcomingList, pageCount} = this.state
    return (
      <>
        <ul className="movies-list-container">
          {upcomingList.map(each => (
            <MoviesCard key={each.id} details={each} />
          ))}
        </ul>
        <div className="btn-container">
          <button
            type="button"
            onClick={this.onClickPrevBtn}
            className="left-btn"
          >
            Prev
          </button>
          <p className="page-no">{pageCount}</p>
          <button
            type="button"
            onClick={this.onClickNextBtn}
            className="left-btn"
          >
            Next
          </button>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="topRated-list-container">
          {isLoading ? this.getLoader() : this.getMovieDetails()}
        </div>
      </>
    )
  }
}

export default UpComing
