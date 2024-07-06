import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'
import SearchContext from '../../context/SearchContext'

const Header = props => {
  const [showSearch, setShowSearch] = useState(false)
  return (
    <SearchContext.Consumer>
      {value => {
        const {menu, showHamMenu, updateInput, searchInput} = value
        const showSearchBtn = () => {
          setShowSearch(!showSearch)
        }
        const onChnageUserInput = event => {
          updateInput(event.target.value)
        }
        const onClickham = () => {
          showHamMenu()
        }
        const {match} = props
        const spH = match.path === '/' && 'col'
        const spT = match.path === '/top-rated' && 'col'
        const spU = match.path === '/upcoming' && 'col'
        const spS = showSearch === true && 'col'

        return (
          <>
            <nav className="nav-header-container">
              <div className="mobile-header-container">
                <div className="mob-top">
                  <div className="img-logo">
                    <img
                      src="data:image/jpeg;base64,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NCaW9GprqPvum+ub71OEOi3pLwXHUVqoGF0tWyQ9jInBzj6FLaVONkvPhpW2oLxNeq7r5RsxsGzDH8we8pMvWw4oxV6YfGyuDbxRPcQAJm5JOAN6R4u5o3itH5LPrHW2siMNXLSyxk52XSt4+laPhmO75+kZqTusS8bW6ftw62P8hhI4OBBPmXYmkd0p/FZfhncuDqLVrJIn0tsLsuGHTHdu8ChfLuNQ2cX2fNZi+X+iG8P7qh6ycaGmhitMwlmjYTVOIDngH9Rq28eYineXg+1aWtmjUb7fvL2VFrsNTPJPMKd8kjtpxM/E+lWTjxTPdmpyubjrFa7iI/L/AMJbpZ7PS9XA6LZYPgwwnOSpTkx466iUK8Xlcu+7RP3lAa2pdWVc9TIBtSv2jjs8C821uq0y+mxY4xY60jyfFcWCAgICAgIB3oGEGMBAwOSBsjkEDZHIIGByCBgcggz257UBAQMDkEAAA5AGUDljdjkgIGEInQmg7coTMyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//2Q=="
                      alt="logo"
                      className="logo-img"
                    />
                    <h1 className="db-name">Movie DB</h1>
                  </div>
                  <button type="button" onClick={onClickham} className="btn">
                    <GiHamburgerMenu className="ham-icon" />
                  </button>
                </div>
                {menu && (
                  <ul className="link-list-container">
                    <Link to="/" className="link">
                      <li id="1" className={`${spH} nav-link`}>
                        Popular
                      </li>
                    </Link>
                    <Link to="/top-rated" className="link">
                      <li id="2" className={`${spT} nav-link`}>
                        Top Rated
                      </li>
                    </Link>
                    <Link to="/upcoming" className="link">
                      <li id="3" className={`${spU} nav-link`}>
                        UpComing
                      </li>
                    </Link>
                    <li id="3">
                      <button
                        type="button"
                        onClick={showSearchBtn}
                        className={`${spS} nav-link btn`}
                      >
                        Search
                      </button>
                    </li>
                  </ul>
                )}
                {showSearch && (
                  <div className="cn">
                    <div className="search-container">
                      <input
                        type="search"
                        placeholder="Search"
                        className="search-el"
                        onChange={onChnageUserInput}
                        value={searchInput}
                      />
                      <Link to="/search-results" className="link">
                        <button type="button" className="search-btn">
                          <BsSearch className="search-icon" />
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="desktop-container">
                <div className="img-logo">
                  <img
                    src="data:image/jpeg;base64,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NCaW9GprqPvum+ub71OEOi3pLwXHUVqoGF0tWyQ9jInBzj6FLaVONkvPhpW2oLxNeq7r5RsxsGzDH8we8pMvWw4oxV6YfGyuDbxRPcQAJm5JOAN6R4u5o3itH5LPrHW2siMNXLSyxk52XSt4+laPhmO75+kZqTusS8bW6ftw62P8hhI4OBBPmXYmkd0p/FZfhncuDqLVrJIn0tsLsuGHTHdu8ChfLuNQ2cX2fNZi+X+iG8P7qh6ycaGmhitMwlmjYTVOIDngH9Rq28eYineXg+1aWtmjUb7fvL2VFrsNTPJPMKd8kjtpxM/E+lWTjxTPdmpyubjrFa7iI/L/AMJbpZ7PS9XA6LZYPgwwnOSpTkx466iUK8Xlcu+7RP3lAa2pdWVc9TIBtSv2jjs8C821uq0y+mxY4xY60jyfFcWCAgICAgIB3oGEGMBAwOSBsjkEDZHIIGByCBgcggz257UBAQMDkEAAA5AGUDljdjkgIGEInQmg7coTMyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//2Q=="
                    alt="logo"
                    className="logo-img"
                  />
                  <h1 className="db-name">Movie DB</h1>
                </div>
                <ul className="link-lg-list-container">
                  <Link to="/" className="link">
                    <li id="1" className={`${spH} nav-link`}>
                      Popular
                    </li>
                  </Link>
                  <Link to="/top-rated" className="link">
                    <li id="2" className={`${spT} nav-link`}>
                      Top Rated
                    </li>
                  </Link>
                  <Link to="/upcoming" className="link">
                    <li id="3" className={`${spU} nav-link`}>
                      UpComing
                    </li>
                  </Link>
                  <div className="search-container">
                    <input
                      type="search"
                      placeholder="Search"
                      className="search-el"
                      onChange={onChnageUserInput}
                      value={searchInput}
                    />
                    <Link to="/search-results" className="link">
                      <button type="button" className="search-btn">
                        <BsSearch className="search-icon" />
                      </button>
                    </Link>
                  </div>
                </ul>
              </div>
            </nav>
          </>
        )
      }}
    </SearchContext.Consumer>
  )
}

export default withRouter(Header)
