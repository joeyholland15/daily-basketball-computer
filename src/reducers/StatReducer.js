import { SCRAPE_STATS_SUCCESS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYER_TRENDS_SUCCESS, FETCH_PLAYER_STATS_SUCCESS } from '../actions/types'

const initialState = {
  scraped: [],
  active: [],
  trends: {},
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SCRAPE_STATS_SUCCESS:
      return {
        ...state,
        scraped: action.stats,
      }

    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        active: action.stats,
      }

    case FETCH_PLAYER_STATS_SUCCESS:
      return {
        ...state,
        selectedPlayerStats: action.stats,
        selectedPlayer: action.player,
      }
    
    default:
      return state
  } 
}


