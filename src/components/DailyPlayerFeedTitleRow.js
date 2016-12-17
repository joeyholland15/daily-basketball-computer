import React from 'react'
import lodash from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { scrapeStats, fetchPlayersByDate } from '../actions'
import DailyPlayerColumn from './DailyPlayerColumn'

class DailyPlayerFeedTitleRow extends Component {
  render() {
    const {
      game,
    } = this.props;
    
    return (
      <div className="player-row">
        <DailyPlayerColumn title value="Pos." className="small" />
        <DailyPlayerColumn title value="Player" className="large" />
        <DailyPlayerColumn title value="Start" className="small" />
        <DailyPlayerColumn title value="Team" className="small" />
        <DailyPlayerColumn title value="Opp" className="small" />
        <DailyPlayerColumn title value="Value" className="small" />
        <DailyPlayerColumn title value="DKP" className="small" />
        <DailyPlayerColumn title value="Salary" className="medium" />
        <DailyPlayerColumn title value="Min" className="small" />
        <DailyPlayerColumn title value="FG" className="small" />
        <DailyPlayerColumn title value="FG %" className="small" />
        <DailyPlayerColumn title value="NPP" className="small" />
        <DailyPlayerColumn title value="Due St" className="small" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.stats.active,
});

export default connect(mapStateToProps)(DailyPlayerFeedTitleRow);