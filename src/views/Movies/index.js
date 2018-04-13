import React from 'react'
import { Link } from 'react-router-dom'

class Movies extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movies: []
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/discover/movie?api_key='+process.env.REACT_APP_TMDB_API_KEY)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => this.setState({movies: data}))
        .catch(error => alert('We could not load the page at this time.'))
    }

    render() {
        const { movies } = this.state

        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                        <h1>{movies.length > 0 ? 'Movies' : 'Loading...'}</h1>
                    </div>
                </header>
                <div className="row movie-list-wrapper">
                    {movies.map((movie, i) => {
                        return (
                            <article key={i} className="col-md-3 my-4 movie-item" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`}}>
                                <div className="overlay">
                                    <header className="w-100">
                                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                                    </header>
                                    <p>{movie.overview}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default Movies