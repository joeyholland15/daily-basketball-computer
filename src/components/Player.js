import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { fetchStatsByPlayer } from '../actions'
import DailyPlayerFeedTitleRow from './DailyPlayerFeedTitleRow'
import DailyPlayerRow from './DailyPlayerRow'
import { dailyStatSelector } from '../selectors/statSelectors'


class Player extends Component {
  componentWillMount() {
    if (this.props.player) {
      this.props.fetchStatsByPlayer(this.props.player)
    }
  }

  render() {
    const {
      player,
      stats,
    } = this.props;

    return (
      <div className="player-feed">
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.stats.selectedPlayerStats,
  player: state.stats.selectedPlayer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsByPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
