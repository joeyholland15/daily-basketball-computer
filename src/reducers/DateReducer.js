import { SCRAPE_STATS_SUCCESS, UPDATE_DATE } from '../actions/types'

var dateObj = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
}

const currentDateToDateNo = () => {
  const dateString = new Date().toString().split(' ');
  const month = dateObj[dateString[1]];
  const day = dateString[2];
  const year = dateString[3];
  return parseInt(year + month + day);
}

const initialState = {
  haveThrough: 20161210, //20161024,
  needThrough: currentDateToDateNo(),
  active: 20141101,
  year: 2014,
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SCRAPE_STATS_SUCCESS:
      return {
        ...state,
        haveThrough: action.date,
      }

    case UPDATE_DATE:
      return {
        ...state,
        active: action.date,
        year: parseInt(action.date.toString().slice(0, 4)),
      }
    
    default:
      return state
  } 
}