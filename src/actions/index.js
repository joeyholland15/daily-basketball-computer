import axios from 'axios'
import * as actions from './types'

const API = 'http://localhost:8081'

export function fetchPlayersByDateSuccess(stats, date) {
  return {
    type: actions.FETCH_PLAYERS_SUCCESS,
    stats,
    date,
  }
}

export function fetchPlayersByDate(date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_PLAYERS,
      date,
    });
    return axios.get(`${API}/api/players/${date}`).then((resp) => {
      if (resp.error) {
        console.log(error)
        return error;
      }
      return dispatch(fetchPlayersByDateSuccess(resp.data, date))
    })
  }
}

export function fetchPlayerTrendsByDateSuccess(data, player) {
  return {
    type: actions.FETCH_PLAYER_TRENDS_SUCCESS,
    data,
    player,
  }
}

export function fetchPlayerTrendsByDate(date, player) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_PLAYER_TRENDS,
      date,
      player,
    });
    return axios.get(`${API}/api/trends/${date}/${player.split(' ').join('&')}`).then((resp) => {
      if (resp.error) {
        console.log(error)
        return error;
      }
      return dispatch(fetchPlayerTrendsByDateSuccess(resp.data, player))
    })
  }
}

export function fetchStatsByPlayerSuccess(stats, player) {
  return {
    type: actions.FETCH_PLAYER_STATS_SUCCESS,
    stats,
    player,
  }
}

export function fetchStatsByPlayer(player) {
  console.log('FETCHING', player)
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_PLAYER_STATS,
      player,
    });
    return axios.get(`${API}/api/player/${player.split(' ').join('&')}`).then((resp) => {
      if (resp.error) {
        console.log(error)
        return error;
      }
      return dispatch(fetchStatsByPlayerSuccess(resp.data, player))
    })
  }
}

export function addPlayersSuccess(stats, date) {
  return {
    type: actions.ADD_PLAYERS_SUCCESS,
    stats,
    date,
  }
}

export function scrapeStatsSuccess(stats, date) {
  return (dispatch) => {
    dispatch({
      type: actions.SCRAPE_STATS_SUCCESS,
      stats,
      date,
    });
    return axios.post(`${API}/api/stats`, {
      body: stats,
    }).then((resp) => {
      if (resp.error) {
        return error;
      }
      return dispatch(addPlayersSuccess(resp.data, date))
    });
  }
}

export function scrapeStats(date) {
  return (dispatch) => {
    dispatch({
      type: actions.SCRAPE_STATS,
      date,
    });
    return axios.get(`${API}/api/stats/${date}`).then((resp) => {
      if (resp.error) {
        console.log(error)
        return error;
      }
      return dispatch(scrapeStatsSuccess(resp.data, date))
    })
  }
}

export function updateDate(date) {
  return {
    type: actions.UPDATE_DATE,
    date,
  }
}

export function updateFeedFilter(filter) {
  return {
    type: actions.UPDATE_FEED_FILTER,
    filter,
  }
}

export function updateTrendFilter(filter) {
  return {
    type: actions.UPDATE_TREND_FILTER,
    filter,
  }
}


