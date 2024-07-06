import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Home from './components/Home'
import SearchContext from './context/SearchContext'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import SearchResults from './components/SearchResults'
import MovieDetails from './components/MovieDetails'

class App extends Component {
  state = {userInput: '', menu: false}

  updateInput = value => {
    this.setState({
      userInput: value,
    })
  }

  showHamMenu = () => {
    this.setState(prev => ({menu: !prev.menu}))
  }

  render() {
    const {userInput, menu} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput: userInput,
          menu,
          showHamMenu: this.showHamMenu,
          updateInput: this.updateInput,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={UpComing} />
          <Route exact path="/search-results" component={SearchResults} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
