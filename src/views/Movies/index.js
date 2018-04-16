import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as moviesActions from '../../actions/moviesActions'

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
        const { movies } = this.state
        const { moviesActions } = this.props

        moviesActions.loadMovies()

        window.addEventListener("scroll", e => {
            const { page } = this.state
            const scrollTop = window.scrollY
            const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
            const pctScrolled = Math.floor(scrollTop/trackLength * 100)
            if(pctScrolled > 95 && !this.state.loadingMovies) {
                moviesActions.loadMovies(page)
                this.setState({
                    loadingMovies: true,
                })
            }
        }, false);

    }

    getDerivedStateFromProps(nextProps) {
        if(nextProps.movies.length > this.state.movies.length) {
            this.setState({
                loadingMovies: false,
                page: this.state.page + 1,
                movies: nextProps.movies
            })
        }
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

function mapStateToProps(state, ownProps){
    return {
        movies: state.movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)