import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  menu: false,
  showHamMenu: () => {},
  updateInput: () => {},
})

export default SearchContext
