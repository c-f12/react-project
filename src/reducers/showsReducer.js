import * as types from '../types/shows'
import initialState from './initialState'

export default function showsReducer(state = initialState.shows, action){
    switch(action.type){
        case types.LOAD_SHOWS_SUCCESS:
            if(action.page === 1) {
                return action.shows
            }
            else {
                return [
                    ...state,
                    ...action.shows,
                ]
            }
        
        case types.DELETE_SHOWS:
            const finding = state.find( show => show.id === action.id)
            const index = state.indexOf(finding);
            state.splice(index, 1)

            console.log(state)
            
            if(index != -1){
                return[
                    ...state
                ]
            }

        default:
        return state
  }
}
