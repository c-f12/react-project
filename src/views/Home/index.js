import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Movie from '../../components/Movie'

import * as movieActions from '../../actions/movieActions'

class Home extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movie: {}
        }
    }

    componentDidMount(){
        const { movieActions } = this.props

        movieActions.loadLatestMovie()
    }

    componentWillReceiveProps({movie}) {
        this.setState({movie})
    }

    render () {
        const { movie } = this.state
        
        return (
            <section className="container main home">
                <header className="row">
                    <div className="col-12">
                        <h1>Random Movie</h1>
                    </div>
                </header>
                <div className="row movie-list-wrapper">

                    <article 
                        className="col-md-3 my-4 movie-item"
                        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`}}
                    >
                        <div className="overlay">
                            <p>{movie.overview}</p>
                        </div>
                    </article>

                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movie: state.movie
    }
}

function mapDispatchToProps(dispatch){
    return {
        movieActions: bindActionCreators(movieActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

