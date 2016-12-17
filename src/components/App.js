import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { scrapeStats, fetchPlayersByDate } from '../actions';
import DailyPlayerFeed from './DailyPlayerFeed';
import DateSelector from './DateSelector';
import FeedFilters from './FeedFilters';
import PlayerTrendFeed from './PlayerTrendFeed';

const daysInMonths = {
  '01': 32,
  '02': 29,
  '03': 32,
  '04': 31,
  '05': 32,
  '06': 31,
  '07': 32,
  '08': 32,
  '09': 31,
  '10': 32,
  '11': 31,
  '12': 32
}

class App extends Component {
  // add any necessary stats to the database
  componentWillMount () {
    const {
      haveThrough,
      needThrough,
      stats,
    } = this.props;
    if (needThrough > haveThrough) {
      // dispatch action to scrape and post
      //this.props.scrapeStats(this.nextDayOrMonth(haveThrough))
    } else {
      //this.props.fetchPlayersByDate(20161111);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.needThrough > nextProps.haveThrough) {
      // console.log('HAVE THROUGH:', nextProps.haveThrough)
      this.props.scrapeStats(this.nextDayOrMonth(nextProps.haveThrough))
    } else {
      // this.props.fetchPlayersByDate(20161025);
    }
  }

  nextDayOrMonth = (dateNo) => {
    let date = (parseInt(dateNo) + 1).toString();
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6);
    let nextMonthInt = parseInt(month) + 1 < 10 ? '0' + (parseInt(month) + 1).toString() : (parseInt(month) + 1).toString();
    let atMax = daysInMonths[month] === parseInt(day);
    month = atMax ? nextMonthInt : month;
    day = atMax ? '01' : day;
    if (month === '13') {
      month = '01';
      year = (parseInt(year) + 1).toString();
    }
    let formatted = `${year}${month}${day}`;
    return parseInt(formatted);
  }

  render() {
    const {
      filter,
    } = this.props;

    return (
      <div>
        <DateSelector />
        <FeedFilters />
        {filter === 'Today' && <DailyPlayerFeed />}
        {filter === 'Trends' && <PlayerTrendFeed />}
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    haveThrough: state.date.haveThrough,
    needThrough: state.date.needThrough,
    filter: state.filter.feed,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  scrapeStats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
