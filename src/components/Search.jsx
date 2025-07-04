import React from 'react'

const Search = ({searchMovie , setSearchMovie}) => {
  return (
    <div className='search'>
      <div>
        <img src="./search.svg" alt="search" />
        <input
            type="text"
            placeholder='Search for a movie'
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
