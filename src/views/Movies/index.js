import React from 'react'

import Movie from '../../components/Movie'

const MOVIE_URL = 'https://api.themoviedb.org/3/discover/movie?api_key='

class Movies extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movies: [],
            page: 1,
            loadingMovies: false
        }
    }

    componentDidMount(){
        this.loadMovies()

        window.addEventListener("scroll", e => {
            const scrollTop = window.scrollY
            const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
            const pctScrolled = Math.floor(scrollTop/trackLength * 100)
            if(pctScrolled > 95 && !this.state.loadingMovies) {
                this.loadMovies()
                this.setState({
                    loadingMovies: true
                })
            }
        }, false);
    }

    loadMovies = () => {
        const { page } = this.state
        fetch(`${MOVIE_URL}${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`)
        .then(response => response.json())
        .then(json => json.results)
        .then(movies => {
            if(page === 1) {
                this.setState({
                    movies,
                    page: page+1,
                    loadingMovies: false
                })
            }
            else {
                this.setState({
                    movies: [
                        ...this.state.movies,
                        ...movies
                    ],
                    page: page+1,
                    loadingMovies: false
                })
            }
        })
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
                            <Movie
                                key={i}
                                {...movie}
                            />
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default Movies






