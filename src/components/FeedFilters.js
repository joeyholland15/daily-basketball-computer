import React from 'react'
import lodash from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { updateFeedFilter, updateTrendFilter } from '../actions'
import DailyPlayerColumn from './DailyPlayerColumn'

const filters = ['Today', 'Trends'];

const trendFilters = ['Value', 'DKP', 'FG', 'Min', 'NPP', 'Due'];

class FeedFilters extends Component {
  render() {
    const {
      filter,
      trendFilter,
    } = this.props;
    
    return (
      <div className="feed-filters-container">
        {filters.map((filter, idx) => (
          <div key={idx} className={`feed-filter ${filter === this.props.filter ? "selected-filter" : ''}`} onClick={() => {this.props.updateFeedFilter(filter)}}>{filter}</div>
        ))}
        {filter === 'Trends' && trendFilters.map((filter, idx) => (
          <div key={idx} className={`feed-filter ${filter === this.props.trendFilter ? "selected-filter" : ''}`} onClick={() => {this.props.updateTrendFilter(filter)}}>{filter}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter.feed,
  trendFilter: state.filter.trend,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateFeedFilter,
  updateTrendFilter,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedFilters);
