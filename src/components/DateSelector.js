import lodash from 'lodash';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { updateDate } from '../actions'
import DailyPlayerColumn from './DailyPlayerColumn'

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

const numberToMonth = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

class DateSelector extends Component {
  makeDateNoPretty = (dateNo) => {
    const string = dateNo.toString();
    const year = string.slice(0, 4);
    const month = numberToMonth[string.slice(4, 6)];
    const day = string.slice(6);
    return `${month} ${day}, ${year}`
  }

  checkForPrevMonth = (dateNo) => {
    let date = (parseInt(dateNo) - 1).toString();
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6);
    let prevMonthInt = parseInt(month) - 1 < 10 ? '0' + (parseInt(month) - 1).toString() : (parseInt(month) - 1).toString();
    let atMin = parseInt(day) < 1;
    month = atMin ? prevMonthInt : month;
    day = atMin ? daysInMonths[prevMonthInt.toString()] - 1 : day;
    let formatted = `${year}${month}${day}`;
    return formatted;
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

  toPrevDate = () => this.props.updateDate(this.checkForPrevMonth(this.props.date));
  toNextDate = () => this.props.updateDate(this.nextDayOrMonth(this.props.date));

  render() {
    const {
      date,
    } = this.props;

    if (!date) {
      return null;
    }

    const prevDate = this.makeDateNoPretty(this.checkForPrevMonth(date));
    const nextDate = this.makeDateNoPretty(this.nextDayOrMonth(date));
    
    return (
      <div className="date-filter-container">
        <div className="date-filter" onClick={this.toPrevDate}>{prevDate}</div>
        <div className="date-filter">{this.makeDateNoPretty(date)}</div>
        <div className="date-filter" onClick={this.toNextDate}>{nextDate}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date.active,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
