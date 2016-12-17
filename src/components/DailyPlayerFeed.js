import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { fetchPlayersByDate } from '../actions'
import DailyPlayerFeedTitleRow from './DailyPlayerFeedTitleRow'
import DailyPlayerRow from './DailyPlayerRow'
import { dailyStatSelector } from '../selectors/statSelectors'


class DailyPlayerFeed extends Component {
  componentWillMount() {
    this.props.fetchPlayersByDate(this.props.date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.fetchPlayersByDate(nextProps.date);
    }
  }

  render() {
    const {
      stats,
    } = this.props;

    return (
      <div className="feed-container">
        <DailyPlayerFeedTitleRow />
        {stats && stats.map((stat, idx) => (
          <DailyPlayerRow key={idx} game={stat} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: dailyStatSelector(state),
  date: state.date.active,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPlayersByDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DailyPlayerFeed);
