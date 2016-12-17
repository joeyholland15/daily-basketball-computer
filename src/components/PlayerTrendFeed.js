import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore';
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { fetchPlayerTrendsByDate } from '../actions'
import DailyPlayerFeedTitleRow from './DailyPlayerFeedTitleRow'
import PlayerTrendRow from './PlayerTrendRow'
import { dailyStatSelector, trendStatSelector } from '../selectors/statSelectors'


class PlayerTrendFeed extends Component {
  componentWillMount() {
    this.props.stats.forEach((game) => {
      this.props.fetchPlayerTrendsByDate(this.props.date, game.name);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.stats.forEach((game) => {
        this.props.fetchPlayerTrendsByDate(nextProps.date, game.name.split(' ').join('&'));
      })
    }
  }

  render() {
    const {
      stats,
      trendFilter,
      feedFilter,
      date,
      trendStats,
    } = this.props;

    if (!feedFilter === 'Trends') {
      return null;
    }

    const sortedStats = trendStats && Object.keys(trendStats).sort((first, second) => {
      return trendStats[second].today.heat - trendStats[first].today.heat;
    })

    return (
      <div className="feed-container">
        {sortedStats&& sortedStats.map((name, idx) => (
          <PlayerTrendRow key={idx} data={trendStats[name]} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: dailyStatSelector(state),
  date: state.date.active,
  feedFilter: state.filter.feed,
  trendFilter: state.filter.trend,
  trendStats: trendStatSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPlayerTrendsByDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTrendFeed);
