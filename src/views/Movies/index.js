import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import Movie from '../../components/Movie'

import * as moviesActions from '../../actions/moviesActions'

class Movies extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movies: [],
            page: 1,
            loadingMovies: false,
            nowViewing: 'popular',
            sortBy: 'title-asc'
        }
    }

    componentDidMount(){
        const { movies, nowViewing, page } = this.state
        const { moviesActions } = this.props

        moviesActions.loadMovies(page, nowViewing)

        window.addEventListener("scroll", this.infiniteScroller, false);
    }

    infiniteScroller =  e => {
        const { moviesActions } = this.props
        const { page, nowViewing } = this.state
        const scrollTop = window.scrollY
        const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
        const pctScrolled = Math.floor(scrollTop/trackLength * 100)
        if(pctScrolled > 95 && !this.state.loadingMovies) {
            moviesActions.loadMovies(page, nowViewing)
            this.setState({
                loadingMovies: true
            })
        }
    }

    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.infiniteScroller, false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.movies.length > this.state.movies.length) {
            this.setState({
                loadingMovies: false,
                page: this.state.page + 1,
                movies: nextProps.movies
            })
        }
        else {
            this.setState({
                movies: nextProps.movies
            })
        }
    }

    onViewingChange = e => {
        const nowViewing = e.target.value
        const { moviesActions } = this.props
        moviesActions.loadMovies(1, nowViewing)
        this.setState({
            page: 2,
            loadingMovies: true,
            nowViewing
        })
    }

    onSortChange = e => {
        this.setState({sortBy: e.target.value})
    }

    sortMovies = movies => {
        const { sortBy } = this.state
        const sorting = sortBy.split('-')

        return _.orderBy(movies, sorting[0], sorting[1])
    }

    render() {
        const { movies, nowViewing, sortBy } = this.state

        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                        <h1>{movies.length > 0 ? 'Movies' : 'Loading...'}</h1>
                    </div>
                </header>
                <aside className="row">
                    <div className="form-group">
                        <label>Now viewing:</label>
                        <select className="form-control" onChange={this.onViewingChange} defaultValue={nowViewing}>
                            <option value="popular">Popular</option>
                            <option value="topRated">Top Rated</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select className="form-control" onChange={this.onSortChange} defaultValue={sortBy}>
                            <option value="title-asc">Title (Asc)</option>
                            <option value="title-desc">Title (Desc)</option>
                        </select>
                    </div>
                </aside>
                <div className="row movie-list-wrapper">
                    {this.sortMovies(movies).map((movie, i) => {
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

