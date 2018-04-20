import * as types from '../types/show'

export function loadShowSuccess(show){
    return { type: types.LOAD_SHOW_SUCCESS, show }
}

export function loadShowFailure(){
    return { type: types.LOAD_SHOW_FAILURE }
}

export function loadSimilarShowSuccess(similar){
    return { type: types.LOAD_SIMILAR_SHOW_SUCCESS, similar }
}

export function loadRecommendedShowSuccess(recommended){
    return { type: types.LOAD_RECOMMENDED_SHOW_SUCCESS, recommended }
}

export function loadCommentsShowSuccess(comments){
    return { type: types.LOAD_COMMENTS_SHOW_SUCCESS, comments }
}

export function loadShow(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then( response => response.json())
        .then( show => dispatch(loadShowSuccess(show)) )
        .catch(error => {
            dispatch(loadShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadSimilarShow(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then( response => response.json())
        .then( json => json.results )
        .then( similar => dispatch(loadSimilarShowSuccess(similar)) )
        .catch(error => {
            dispatch(loadShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadRecommendedShow(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then( response => response.json())
        .then( json => json.results )
        .then( recommended => dispatch(loadRecommendedShowSuccess(recommended)) )
        .catch(error => {
            dispatch(loadShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadCommentsShow(id){
    return dispatch => {
        fetch(`http://localhost:3010/comments?showId=${id}`)
        .then( response => response.json())
        .then( comments => { dispatch(loadCommentsShowSuccess(comments)), console.log(comments) } )
        .catch(error => {
            dispatch(loadShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function postCommentsShow(username, body, id){
    return dispatch => {
        fetch('http://localhost:3010/comments', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                body: body,
                showId: +id
            })
        })
        .then((response) => console.log(response) )
        .catch(error => {
            dispatch(loadShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function deleteCommentsShow(id){
    return dispatch => {
        fetch(`http://localhost:3010/comments/${id}`, {  
            method: 'DELETE'
        })
        .then((response) => console.log(response) )
        .catch(error => {
            dispatch(loadShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}