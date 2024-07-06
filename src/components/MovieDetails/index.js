import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class MovieDetails extends Component {
  state = {details: {}, isLoading: true, castDetails: []}

  componentDidMount() {
    this.getSpMovieDetails()
    this.getMovieCastDetails()
  }

  getMovieCastDetails = async () => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedCastData = data.cast.map(eachCast => ({
        adult: eachCast.adult,
        castId: eachCast.cast_id,
        character: eachCast.character,
        creditId: eachCast.credit_id,
        gender: eachCast.gender,
        id: eachCast.id,
        knownForDepartment: eachCast.known_for_department,
        name: eachCast.name,
        order: eachCast.order,
        originalName: eachCast.original_name,
        popularity: eachCast.popularity,
        profilePath: eachCast.profile_path,
      }))
      this.setState({castDetails: updatedCastData, isLoading: false})
    }
  }

  getSpMovieDetails = async () => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        belongsToCollection:
          data.belongs_to_collection === null
            ? null
            : {
                backdropPath: data.belongs_to_collection.backdrop_path,
                id: data.belongs_to_collection.id,
                name: data.belongs_to_collection.name,
                posterPath: data.belongs_to_collection.poster_path,
              },
        budget: data.budget,
        genres: data.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
        homepage: data.homepage,
        id: data.id,
        imdbId: data.imdb_id,
        originCountry: data.origin_country,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        productionCompanies: data.production_companies.map(company => ({
          id: company.id,
          logoPath: company.logo_path,
          name: company.name,
          originCountry: company.origin_country,
        })),
        productionCountries: data.production_countries.map(country => ({
          iso_3166_1: country.iso_3166_1,
          name: country.name,
        })),
        releaseDate: data.release_date,
        revenue: data.revenue,
        runtime: data.runtime,
        spokenLanguages: data.spoken_languages.map(language => ({
          englishName: language.english_name,
          iso_639_1: language.iso_639_1,
          name: language.name,
        })),
        status: data.status,
        tagline: data.tagline,
        title: data.title,
        video: data.video,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      }
      this.setState({details: updatedData})
      console.log(updatedData)
    }
  }

  displayLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResults = () => {
    const {details, castDetails} = this.state
    const {
      title,
      backdropPath,
      voteAverage,
      runtime,
      genres,
      releaseDate,
      overview,
    } = details
    const url = `https://image.tmdb.org/t/p/w500${backdropPath}`
    const time = timeinMin => {
      const hours = Math.floor(timeinMin / 60)
      const remainingMin = timeinMin % 60
      return `${hours}hrs ${remainingMin}min`
    }
    return (
      <div className="total-details-container">
        <div className="movie-details-container">
          <img src={url} alt={title} className="movie-img-s" />
          <div className="movie-title-details-container">
            <p className="movie-name-s">
              Movie Name: <span className="sp">{title}</span>
            </p>
            <p className="movie-name-s">
              Ratings: <span className="sp">{voteAverage}</span>
            </p>
            <p className="movie-name-s">
              Duration: <span className="sp">{time(runtime)}</span>
            </p>
            {genres !== undefined && (
              <p className="movie-name-s">
                Genre:{' '}
                {genres.length === 0
                  ? 'None'
                  : genres.map(g => <span className="sp">{g.name},</span>)}
              </p>
            )}
            <p className="movie-name-s">
              Release Date: <span className="sp">{releaseDate}</span>
            </p>
            <p className="movie-name-s">
              Overview: <span className="sp">{overview}</span>
            </p>
          </div>
        </div>
        <div className="cast-details-container">
          <p className="movie-name-s">
            Cast Details: {castDetails.length === 0 ? 'None' : ''}
          </p>
          <ul className="cast-list-container">
            {castDetails.length === 0
              ? ''
              : castDetails.map(eachMovieCast => {
                  const {character, name, profilePath} = eachMovieCast
                  const profileUrl = `https://image.tmdb.org/t/p/w500${profilePath}`
                  return (
                    <li className="each-movie-item">
                      <img
                        src={profileUrl}
                        alt={name}
                        className="profile-img"
                      />
                      <p className="name">
                        Name: <span className="ch">{name}</span>
                      </p>
                      <p className="name">
                        Character Name: <span className="ch">{character}</span>
                      </p>
                    </li>
                  )
                })}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="container">
          {isLoading ? this.displayLoadingView() : this.renderResults()}
        </div>
      </>
    )
  }
}

export default MovieDetails
