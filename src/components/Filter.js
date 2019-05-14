import "../css/Filter.css";
import React from "react";

class MapFilter extends React.Component {
  timeChange = e => {
    // console.log("time value:", e.target.value);
    this.props.onSelectTime(e.target.value);
  };
  limitChange = e => {
    // console.log("limit value:", e.target.value);
    this.props.onSelectLimit(e.target.value);
  };

  filterRender() {
    if (this.props.checkTag !== "") {
      return (
        <div className="filter-container">
          <div>
            <div className="ui form">
              <div className="inline fields" onChange={this.timeChange}>
                <label className="filter-name">
                  <i className="clock outline icon" />
                  Time Filter
                </label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="time" value="all" />
                    <label className="filter-item">All</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="time" value="oneMonth" />
                    <label className="filter-item">One Month</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="time" value="sixMonths" />
                    <label className="filter-item">Six Months</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="time" value="oneYear" />
                    <label className="filter-item">One Year</label>
                  </div>
                </div>
              </div>

              <div className="inline fields" onChange={this.limitChange}>
                <label className="filter-name">
                  <i className="clone outline icon" />
                  Maximum Number
                </label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="limit" value="50" />
                    <label className="filter-item">50</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="limit" value="100" />
                    <label className="filter-item">100</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="limit" value="150" />
                    <label className="filter-item">150</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="limit" value="200" />
                    <label className="filter-item">200</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>{this.filterRender()}</div>
      </div>
    );
  }
}

export default MapFilter;
