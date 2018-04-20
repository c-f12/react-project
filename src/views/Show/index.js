import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import OtherShow from '../../components/Show'
import Comment from '../../components/Comment'

import * as showActions from '../../actions/showActions'

class Show extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            show: {},
            similar: [],
            recommended: [],
            comments: [],
            username:"",
            body:""
        }
    }

    componentDidMount(){
        const { showActions, match } = this.props

        showActions.loadShow(match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        this.setState({
            show: nextProps.show,
            similar: nextProps.similar,
            recommended: nextProps.recommended,
            comments: nextProps.comments
        })
    }

    showSimilar = e => {
        const { showActions, match } = this.props
        showActions.loadSimilarShow(match.params.id)
    }

    showRecomm = e => {
        const { showActions, match } = this.props
        showActions.loadRecommendedShow(match.params.id)
    }

    showComments = () => {
        const { showActions, match } = this.props
        showActions.loadCommentsShow(match.params.id)
    }

    getUsername = e => {
        this.setState({username: e.target.value})
    }
    getBody = e => {
        this.setState({body: e.target.value})            
    }

    postComment = e => {
        const { showActions, match } = this.props
        const { username, body } = this.state
        e.preventDefault();
        
        showActions.postCommentsShow(username, body, match.params.id)
    }

    deleteComment = id => {
        const { showActions } = this.props
        showActions.deleteCommentsShow(id)
    }

    render() {
        const { show, similar, recommended, comments, visible } = this.state

        return (
            <section className="container main movie" style={{backgroundImage: show.id ? `url(https://image.tmdb.org/t/p/w342/${show.backdrop_path})` : ''}}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{show.id ? show.name : 'Loading...'}</h1>
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${show.poster_path})`}}>

                    </footer>
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{show.name}</h1>
                            <button className="btn-primary" onClick={this.showSimilar}>shows similares</button>
                            <button className="btn-primary" onClick={this.showRecomm}>shows recomendados</button>
                            <button className="btn-primary" onClick={this.showComments}>comentarios</button>
                        </header>
                        <p className="d-block">{show.overview}</p>
                    </div>
                </article>
                <div className="row movie-list-wrapper">
                    <h1 className="col-12" style={{color: 'white'}}>Similar Shows</h1>
                    {similar.map((s, i) => {
                        return (
                            <OtherShow
                                key={i}
                                {...s}
                            />
                        )
                    })}
                </div>
                <div className="row movie-list-wrapper">
                    <h1 className="col-12" style={{color: 'white'}}>Recommended Shows</h1>
                    {recommended.map((r, i) => {
                        return (
                            <OtherShow
                                key={i}
                                {...r}
                            />
                        )
                    })}
                </div>
                <div className="row movie-list-wrapper">
                    <h1 className="col-12" style={{color: 'white'}}>Comments</h1>

                    <form onSubmit={this.postComment} style={{color: 'white'}}>
                        <div className="mb-3 col-6">
                            <label htmlFor="user">username</label>
                            <input type="text" id="username" onChange={this.getUsername}/>
                        </div>

                        <div className="mb-3 col-6">
                            <label htmlFor="body">body</label>
                            <input type="text" id="body" onChange={this.getBody}/>
                        </div>

                        <button type="submit">Post Comment</button>
                    </form>
                    {comments.map((c, i) => {
                        return (
                            <Comment
                                key={i}
                                {...c}
                                deleteComment = {this.deleteComment}
                            />
                        )
                    })}
                </div>
                
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        show: state.show.show,
        similar: state.show.similar,
        recommended: state.show.recommended,
        comments: state.show.comments
    }

}

function mapDispatchToProps(dispatch){
    return {
        showActions: bindActionCreators(showActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)

