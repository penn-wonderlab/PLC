import "../css/AnnotList.css";
import React from "react";
import SearchedAnnotList from "./SearchAnnots";
import NetworkMap from "./NetworkMap";
import MapFilter from "./Filter";
import { connect } from "react-redux";
import { fetchAnnots } from "../actions";
import { fetchSearchedAnnots } from "../actions";

class AnnotList extends React.Component {
  constructor(props) {
    super(props);
    this.renderTag = this.renderTag.bind(this);
    this.state = {
      selectedTerm: "",
      isOpen: false,
      backMap: false,
      time: "",
      limit: 50
    };
  }

  componentDidMount() {
    const { username } = this.props.location.state;
    this.props.fetchAnnots(username);

    console.log("try pass from component:", username);
    // const token = "6879-QLwKBhX26Ja-nDyHvT5HslkRkuU41tr3W7GscMy3yVY";
    // const headers = {
    //   Authorization: "Bearer" + token,
    //   "Content-type": "application/json"
    // };
    // axios({
    //   method: "GET",
    //   url: "https://hypothes.is/api/",
    //   headers: headers
    // })
    //   .then(response => {
    //     console.log("response data:", response.data);
    //   })
    //   .catch(error => {
    //     console.log("error:", error);
    //   });
  }

  //   renderList() {
  //     return this.props.annots.map(annot => {
  //       return (
  //         <div className="item" key={annot.id}>
  //           <div className="content">
  //             <div className="description">
  //               <h2>{annot.user}</h2>
  //               <p>{annot.text}</p>
  //               <h5>{annot.tags.join()}</h5>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     });
  //   }

  renderTag() {
    var a = [];
    const b = this.props.annots;
    for (var i = 0; i < b.length; i++) {
      a.push(b[i].tags);
    }
    var flat = [];
    for (var j = 0; j < a.length; j++) {
      flat = flat.concat(a[j]);
    }
    // console.log("bbb", flat);
    var uniqueTags = flat.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });
    // console.log("unique", uniqueTags);
    var tagCounts = [];
    for (var k = 0; k < flat.length; k++) {
      var tagElement = flat[k];
      tagCounts[tagElement] = tagCounts[tagElement]
        ? tagCounts[tagElement] + 1
        : 1;
    }
    // console.log("counts:", tagCounts);
    const tagArray = [];
    for (var n = 0; n < uniqueTags.length; n++) {
      tagArray.push({
        text: uniqueTags[n],
        count: tagCounts[uniqueTags[n]]
      });
    }
    // console.log("lalal", tagArray);

    return tagArray.map(tag => {
      return (
        <div className="ui horizontal list" key={tag.text}>
          <p
            className="item tag-item"
            onClick={() => this.onClickTag(tag.text)}
          >
            {tag.text} &nbsp; {tag.count}
          </p>
        </div>
      );
    });
  }

  onSearchSubmit = term => {
    this.props.fetchSearchedAnnots(term, this.state.limit);
    this.setState({
      selectedTerm: term,
      backMap: false
    });
  };

  onClickTag = tag => {
    // console.log("tag by clicked", tag);
    this.props.fetchSearchedAnnots(tag, this.state.limit);
    this.setState({
      selectedTerm: tag,
      backMap: false
    });
  };

  handleTime = time => {
    this.setState({
      time: time
    });
  };

  handleLimit = limit => {
    this.props.fetchSearchedAnnots(this.state.selectedTerm, Number(limit));
  };

  // showMore() {
  //   this.state.itemsToShow === 20
  //     ? this.setState({ itemsToShow: this.state.try.length, expanded: true })
  //     : this.setState({ itemsToShow: 20, expanded: false });
  // }

  //   renderSearchedAnnots() {
  //     console.log("haha", this.props.searchedAnnots);
  //     return this.props.searchedAnnots.map(annot => {
  //       return (
  //         <div>
  //           <p>{annot.user}</p>
  //           <p>{annot.text}</p>
  //         </div>
  //       );
  //     });
  //   }

  render() {
    const data = this.props.searchedAnnots;
    const Pagedata = this.props.pageAnnots;
    // console.log("all annots on this page!:", this.props.pageAnnots);
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <SearchedAnnotList onSubmit={this.onSearchSubmit} />
          <div className="tag-list">
            <div className="list-container">{this.renderTag()}</div>
          </div>
        </div>

        <NetworkMap
          searchedAnnots={{ data, Pagedata }}
          passTag={this.state.selectedTerm}
          backMap={this.state.backMap}
          handleTime={this.state.time}
        />

        <MapFilter
          checkTag={this.state.selectedTerm}
          onSelectTime={this.handleTime}
          onSelectLimit={this.handleLimit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state", state);
  return {
    annots: state.annots,
    searchedAnnots: state.searchedAnnots,
    pageAnnots: state.pageAnnots
  };
};

// const mapDispatchToPros = dispatch => ({
//   fetchSearchedAnnots: term => dispatch(fetchSearchedAnnots(term)),
//   fetchAnnots: () => dispatch(fetchAnnots())
// });

export default connect(
  mapStateToProps,
  { fetchAnnots, fetchSearchedAnnots }
)(AnnotList);
