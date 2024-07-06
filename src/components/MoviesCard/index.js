import {Link} from 'react-router-dom'
import './index.css'

const MoviesCard = props => {
  const {details} = props
  const {id, title, posterPath, voteAverage} = details
  const url = `https://image.tmdb.org/t/p/w500${posterPath}`
  return (
    <li key={id} className="each-movie-container">
      <img src={url} alt={title} className="poster-img" />
      <div className="movie-spdetails-container">
        <p className="movie-name">
          Title: <span className="inline">{title}</span>
        </p>
        <p className="movie-name">
          Rating: <span className="inline">{voteAverage}</span>
        </p>
        <Link to={`/movie/${id}`} className="link">
          <button type="button" className="view-details-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MoviesCard
