import React from 'react'
import lodash from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { scrapeStats, fetchPlayersByDate } from '../actions'
import DailyPlayerColumn from './DailyPlayerColumn'

class DailyPlayerRow extends Component {
  formatSalary = (salary) => {
    const chars = salary.toString().split('');
    chars.unshift('$');
    chars.splice(-3, 0, ',');
    return chars.join('');
  }

  render() {
    const {
      game,
    } = this.props;
    
    return (
      <div className="player-row">
        <DailyPlayerColumn value={game.position} className="small" />
        <DailyPlayerColumn value={game.name} property="name" className="large" />
        <DailyPlayerColumn value={game.start ? '^' : 'no'} className="small" />
        <DailyPlayerColumn value={lodash.capitalize(game.team)} className="small" />
        <DailyPlayerColumn value={lodash.capitalize(game.opp.split(' ')[1])} className="small" />
        <DailyPlayerColumn value={game.value.toFixed(3)} className="small" />
        <DailyPlayerColumn value={game.points} className="small" />
        <DailyPlayerColumn value={this.formatSalary(game.salary)} className="medium" />
        <DailyPlayerColumn value={game.minutes} className="small" />
        <DailyPlayerColumn value={`${game.fgm} - ${game.fga}`} className="small" />
        <DailyPlayerColumn value={game.fgp || 0} className="small" />
        <DailyPlayerColumn value={game.points - game.pts} className="small" />
        <DailyPlayerColumn value={(game.fga && game.fgp && (game.fga/game.fgp).toFixed(3)) || 0} className="small" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.stats.active,
});

export default connect(mapStateToProps)(DailyPlayerRow);