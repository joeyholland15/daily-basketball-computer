import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { scrapeStats, fetchPlayersByDate } from '../actions'

const DailyPlayerColumn = ({
  value,
  className,
  title,
  property,
}) => {
  if (property === 'name') {
    return <Link to={`/player`}><span className={`player-col ${className} ${title ? 'player-col-title' : ''}`}>{value}</span></Link>
  }

  return (
    <span className={`player-col ${className} ${title ? 'player-col-title' : ''}`}>{value}</span>
  );
}

export default DailyPlayerColumn;