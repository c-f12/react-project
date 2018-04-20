import * as types from '../types/show'
import initialState from './initialState'

export default function showReducer(state = [], action){

    switch(action.type){
        case types.LOAD_SHOW_SUCCESS:
            return { show: action.show, similar: [], recommended: [], comments: [] }

        case types.LOAD_SIMILAR_SHOW_SUCCESS:
            return { show: state.show, similar: action.similar, recommended: state.recommended, comments: state.comments }
        
        case types.LOAD_RECOMMENDED_SHOW_SUCCESS:
            return { show: state.show, similar: state.similar, recommended: action.recommended, comments: state.comments }

        case types.LOAD_COMMENTS_SHOW_SUCCESS:
            return { show: state.show, similar: state.similar, recommended: state.recommended, comments: action.comments }

        default:
            return state
  }
}