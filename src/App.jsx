import { useState, useEffect } from 'react'
import Search from './components/Search'
import ErrorMessageDisplay from './utils/ErrorMessageDisplay'
import Loader from './utils/Loader'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'use-debounce'
import { getTrendingMovies, updateSearchCount } from './appwrite'




const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchMovie, setSearchMovie] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [optimisedSearchTerm] = useDebounce(searchMovie, 1000);
  const [trendingMoviesList, setTrendingMoviesList] = useState([]);
  const [errorMessageForTrendingMovie, setErrorMessageForTrendingMovie] = useState('');
  const [isLoadingForTrending, setIsLoadingForTrending] = useState(false);

  ///////////////////// functions to fetch api requests. ///////////////////////////////

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    try {
      const endpoint = query.length > 0 ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?include_adult=true&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!data) {
        setMovieList([]);
        throw new Error(data.Error || "Error while fetching movie database. Please try again later!")
      }

      setMovieList(data.results || []);
      if (data.results.length > 0 && query.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    }
    catch (error) {
      console.log("Error while fetching movie database in catch block in app.jsx", error)
      setErrorMessage('Error while fetching movie database. Please try again later!')
    }
    finally {
      setIsLoading(false)
    }

  }


  const loadTrendingMovies = async () => {
    setIsLoadingForTrending(true)
    try {
      const trendingMovies = await getTrendingMovies();
      if (!trendingMovies) {
        setTrendingMoviesList([]);
        throw new Error('Error while fetching database. Please try again later!')
      }
      setTrendingMoviesList(trendingMovies)

    } catch (error) {
      console.log("Error while fetching database in loadTrendingMovies function from catch block in app.jsx.", error);
      setErrorMessageForTrendingMovie('Error while fetching Trending Movies. Please try again later!')
    }
    finally {
      setIsLoadingForTrending(false)
    }
  }

  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    fetchMovies(optimisedSearchTerm);
  }, [optimisedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero-banner" />
          <h1>Find <span className='bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent'>movies</span> you'll enjoy without the hassle</h1>
          <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
        </header>

        {
          (trendingMoviesList && !errorMessageForTrendingMovie && !isLoadingForTrending && trendingMoviesList.length > 0) ?
          (
            <section className='trending'>
              <h2>Trending Movies</h2>
              <ul>
                {
                  trendingMoviesList.map((movie, index) => {
                    return (
                      <li key={movie.movieId}>
                        <p>{index + 1}</p>
                        <img src={movie.poster_url} alt="" />
                      </li>
                    )
                  })
                }
              </ul>
            </section>
          )
          : 
          (
            <section className='trending'>
              <h2>Trending Movies</h2>
              {isLoadingForTrending && <Loader />}
              {errorMessageForTrendingMovie && !isLoadingForTrending && <ErrorMessageDisplay errorMessage={errorMessageForTrendingMovie} />}
            </section>
          )
        }

        <section className='all-movies'>
          <h2 className='mt-[20px]'>All Movies</h2>
          {isLoading && <Loader />}
          {errorMessage && !isLoading && <ErrorMessageDisplay errorMessage={errorMessage} />}
          {
            !isLoading && !errorMessage && movieList.length > 0 &&
            (
              <ul>
                {
                  movieList.map((movie, index) => {
                    return (
                      <MovieCard key={movie.id} movie={movie} />
                    )
                  })
                }
              </ul>
            )
          }
        </section>
      </div>
    </main>
  )
}

export default App
