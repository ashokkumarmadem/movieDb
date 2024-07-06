import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MoviesCard from '../MoviesCard'
import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  sucess: 'SUCESS',
  failed: 'FAILED',
}
class Home extends Component {
  state = {status: apiStatusConst.initial, moviesData: [], pageCount: 1}

  componentDidMount() {
    this.getPopularDetails()
  }

  getPopularDetails = async () => {
    const {pageCount} = this.state
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageCount}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
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
      this.setState({moviesData: updatedData, status: apiStatusConst.sucess})
    } else {
      this.setState({status: apiStatusConst.failed})
    }
  }

  onClickPrevBtn = () => {
    const {pageCount} = this.state
    if (pageCount > 2) {
      this.setState(
        prev => ({pageCount: prev.pageCount - 1}),
        this.getPopularDetails,
      )
    } else {
      this.setState({pageCount: 1}, this.getPopularDetails)
    }
  }

  onClickNextBtn = () => {
    const {pageCount} = this.state
    if (pageCount <= 500) {
      this.setState(
        prev => ({pageCount: prev.pageCount + 1}),
        this.getPopularDetails,
      )
    } else {
      this.setState({pageCount: 500}, this.getPopularDetails)
    }
  }

  displaySucessView = () => {
    const {moviesData, pageCount} = this.state
    return (
      <>
        <ul className="movies-list-container">
          {moviesData.map(each => (
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

  displayLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  displayFailureView = () => null

  renderResults = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConst.sucess:
        return this.displaySucessView()
      case apiStatusConst.inProgress:
        return this.displayLoader()
      case apiStatusConst.failed:
        return this.displayFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page-container">{this.renderResults()}</div>
      </>
    )
  }
}

export default Home
