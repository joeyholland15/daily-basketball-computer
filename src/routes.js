import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './components/App'
import Player from './components/Player'

export default (
  <Route path='/' component={App}>
    <Route path="player" component={Player} />
  </Route>
)