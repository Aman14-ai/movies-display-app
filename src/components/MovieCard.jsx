import React from 'react'

const MovieCard = ({ movie }) => {

    const { title, id, adult, backdrop_path, poster_path, release_date, original_language, overview, vote_count, vote_average } = movie;

    return (
        <div className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "./no-movie.png"} alt="" />
            <div className='mt-4'>
                <h3>{title}</h3>

                <div className="content">

                    <div className="rating">
                        <img src="star.svg" alt="star" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">{release_date.split("-")[0]}</p>

                    {adult && (<><span>•</span>
                        <p className="year"> 18+</p></>)}



                </div>
            </div>
        </div>
    )
}

export default MovieCard
