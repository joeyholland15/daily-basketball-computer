import { combineReducers } from 'redux'
import date from './DateReducer'
import stats from './StatReducer'
import filter from './FilterReducer'
import trends from './TrendReducer'

const rootReducer = combineReducers({
  date,
  stats,
  filter,
  trends,
})

export default rootReducer