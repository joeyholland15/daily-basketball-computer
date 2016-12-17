import { FETCH_PLAYER_TRENDS_SUCCESS, UPDATE_DATE } from '../actions/types'

export default function (state = {}, action) {
  switch(action.type) {
    case FETCH_PLAYER_TRENDS_SUCCESS:
      const nextState = { ...state };
      nextState[action.player] = action.data;
      return nextState;

    case UPDATE_DATE:
      return {};
    
    default:
      return state
  } 
}