import { UPDATE_FEED_FILTER, UPDATE_TREND_FILTER } from '../actions/types'

export default function (state = { feed: 'Today', trend: 'Value' }, action) {
  switch(action.type) {
    case UPDATE_FEED_FILTER:
      return {
        ...state,
        feed: action.filter,
      }

    case UPDATE_TREND_FILTER:
      return {
        ...state,
        trend: action.filter,
      }
    
    default:
      return state
  } 
}