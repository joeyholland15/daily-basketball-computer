import React from 'react'
import lodash from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { scrapeStats, fetchPlayersByDate } from '../actions'
import DailyPlayerColumn from './DailyPlayerColumn'

class PlayerTrendRow extends Component {
  colorCode = (value) => {
    let color = 'white';
    if (value >= 6) {
      color = "mediumseagreen"
    } else if (value >= 5.4) {
      color = "lightgreen"
    } else if (value === 0) {
      color = "dnp"
      return color;
    } else if (value < 4) {
      color = 'tomato'
    } else if (value < 5) {
      color = 'orange'
    }
    return color;
  }

  render() {
    const {
      data,
      filter,
    } = this.props;

    const {
      today,
      history,
      future,
    } = data;

    const propertyMap = {
      'Value': 'value',
      'DKP': 'points',
      'Min': 'minutes',
      'Due': 'dueStart',
    }

    const property = propertyMap[filter]
    if (filter === 'FG') {
      return (
        <div className="player-row">
          <DailyPlayerColumn value={today.position} className="small" />
          <DailyPlayerColumn value={today.name} className="large" property="name" />
          <DailyPlayerColumn value={today.salary} className="small" />
          <DailyPlayerColumn value={(history[4] && `${history[4].fgm} - ${history[4].fga}`) || 'DNP'} className={`small ${history[4] && this.colorCode(history[4].value)}`} />
          <DailyPlayerColumn value={(history[3] && `${history[3].fgm} - ${history[3].fga}`) || 'DNP'} className={`small ${history[3] && this.colorCode(history[3].value)}`} />
          <DailyPlayerColumn value={(history[2] && `${history[2].fgm} - ${history[2].fga}`) || 'DNP'} className={`small ${history[2] && this.colorCode(history[2].value)}`} />
          <DailyPlayerColumn value={(history[1] && `${history[1].fgm} - ${history[1].fga}`) || 'DNP'} className={`small ${history[1] && this.colorCode(history[1].value)}`} />
          <DailyPlayerColumn value={(history[0] && `${history[0].fgm} - ${history[0].fga}`) || 'DNP'} className={`small ${history[0] && this.colorCode(history[0].value)}`} />
          <DailyPlayerColumn value={`${today.fgm} - ${today.fga}`} className={`small today`} />
          <DailyPlayerColumn value={(future[0] && `${future[0].fgm} - ${future[0].fga}`) || 'DNP'} className={`small ${future[0] && this.colorCode(future[0].value)}`} />
          <DailyPlayerColumn value={(future[1] && `${future[1].fgm} - ${future[1].fga}`) || 'DNP'} className={`small ${future[1] && this.colorCode(future[1].value)}`} />
          <DailyPlayerColumn value={(future[2] && `${future[2].fgm} - ${future[2].fga}`) || 'DNP'} className={`small ${future[2] && this.colorCode(future[2].value)}`} />
          <DailyPlayerColumn value={(future[3] && `${future[3].fgm} - ${future[3].fga}`) || 'DNP'} className={`small ${future[3] && this.colorCode(future[3].value)}`} />
          <DailyPlayerColumn value={(future[4] && `${future[4].fgm} - ${future[4].fga}`) || 'DNP'} className={`small ${future[4] && this.colorCode(future[4].value)}`} />
        </div>
      );
    }
    
    return (
      <div className="player-row">
        <DailyPlayerColumn value={today.position} className="small" />
        <DailyPlayerColumn value={today.name} property="name" className="large" />
        <DailyPlayerColumn value={today.salary} className="small" />
        <DailyPlayerColumn value={(history[4] && history[4][property]) || 'DNP'} className={`small ${history[4] && this.colorCode(history[4].value)}`} />
        <DailyPlayerColumn value={(history[3] && history[3][property]) || 'DNP'} className={`small ${history[3] && this.colorCode(history[3].value)}`} />
        <DailyPlayerColumn value={(history[2] && history[2][property]) || 'DNP'} className={`small ${history[2] && this.colorCode(history[2].value)}`} />
        <DailyPlayerColumn value={(history[1] && history[1][property]) || 'DNP'} className={`small ${history[1] && this.colorCode(history[1].value)}`} />
        <DailyPlayerColumn value={(history[0] && history[0][property]) || 'DNP'} className={`small ${history[0] && this.colorCode(history[0].value)}`} />
        <DailyPlayerColumn value={today[property]} className={`small today`} />
        <DailyPlayerColumn value={(future[0] && future[0][property]) || 'DNP'} className={`small ${future[0] && this.colorCode(future[0].value)}`} />
        <DailyPlayerColumn value={(future[1] && future[1][property]) || 'DNP'} className={`small ${future[1] && this.colorCode(future[1].value)}`} />
        <DailyPlayerColumn value={(future[2] && future[2][property]) || 'DNP'} className={`small ${future[2] && this.colorCode(future[2].value)}`} />
        <DailyPlayerColumn value={(future[3] && future[3][property]) || 'DNP'} className={`small ${future[3] && this.colorCode(future[3].value)}`} />
        <DailyPlayerColumn value={(future[4] && future[4][property]) || 'DNP'} className={`small ${future[4] && this.colorCode(future[4].value)}`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter.trend,
});

export default connect(mapStateToProps)(PlayerTrendRow);