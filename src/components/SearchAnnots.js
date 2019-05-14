import "../css/SearchAnnots.css";
import React from "react";

class SearchedAnnotList extends React.Component {
  handleKeyPress = e => {
    if (e.key === "Enter") {
      console.log("enter press here!");
      console.log("value", e.target.value);
      this.props.onSubmit(e.target.value);
    }
  };

  render() {
    return (
      <div>
        <div className="dash-header">
          <p>Top Tags</p>
          <div>
            <div className="ui search">
              <div className="ui icon input">
                <input
                  className="prompt"
                  type="text"
                  placeholder="Search Tags ..."
                  onKeyPress={this.handleKeyPress}
                />
                <i className="search icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchedAnnotList;
