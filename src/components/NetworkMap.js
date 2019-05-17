import "../css/NetworkMap.css";
import React from "react";
import networkIcon from "../assets/connection.png";
import zc from "@dvsl/zoomcharts";
import AnnotSidebar from "./Sidebar";
import { connect } from "react-redux";
import { fetchFullAnnot, fetchPageAnnots } from "../actions";

import { Menu, Segment, Sidebar } from "semantic-ui-react";

let Chart = zc.NetChart;

// Zoomcharts license and license key
window.ZoomChartsLicense =
  "ZCS-101rm718m: ZoomCharts SDK 30 day Free Trial License for che..@..l.com (valid for testing only); upgrades until: 2020-03-21";
window.ZoomChartsLicenseKey =
  "39d8cd3eba17f98d5c4b5862a4db1effed5b48b4f96a0d9450" +
  "229bb8b24b0f012c2e95c31e6fdd092901628a73aa3511b6aca50b26575c1dc9c5033b42243a0" +
  "842344a7ea2b32b34cbfc406ea3ea1e1950de24892ebcf773a8157a460fa346039dbd27458a43" +
  "1b5a855d2da8c211526c28caba6402542aac71a8af5b2e3982387394dbf9f4b450da9b8017aad" +
  "08d6e9057b6f40cfa3f52c7cec3b38a40e93e5b6074da373c42810f8f7171396566c2ffacbb12" +
  "5fcf57332ec7afb9264fc6d35a2bb9e20830093d469d92fef823020004ec2dd7f908ee9a7bfb6" +
  "c5fd0134969d7dca1050eeffed66884866f97ae26895c32dd13c8e5cf6c9c37e4a1169ccdaa01";

class NetworkMap extends React.Component {
  state = {
    annotId: "",
    visible: false,
    preTag: "",
    nodeId: "",
    incontext: "",
    backMap: this.props.backMap,
    newState: ""
  };

  componentDidUpdate() {
    // console.log("pass tag here:", this.props.passTag);
    // console.log("show me", this.props.searchedAnnots.data);
    const selectedTag = this.props.passTag;
    // const backMap = this.props.backMap;

    const timeFilter = this.props.handleTime;
    const today = new Date();
    var fullMonths;

    const filterArray = this.props.searchedAnnots.data.filter(arr => {
      function monthDiff(d1, today) {
        d1 = new Date(d1);
        fullMonths = (today.getFullYear() - d1.getFullYear()) * 12;
        fullMonths -= d1.getMonth();
        fullMonths += today.getMonth();
        return fullMonths <= 0 ? 0 : fullMonths;
      }

      if (timeFilter === "oneMonth") {
        return (
          monthDiff(arr.created, today) === 0 ||
          monthDiff(arr.created, today) === 1
        );
      } else if (timeFilter === "sixMonths") {
        return monthDiff(arr.created, today) <= 6;
      } else if (timeFilter === "oneYear") {
        return monthDiff(arr.created, today) <= 12;
      } else if (timeFilter === "" || "all") {
        return this.props.searchedAnnots.data;
      }
    });

    const array = filterArray.filter(arr => {
      return arr.references === undefined;
    });

    const pageArray = this.props.searchedAnnots.Pagedata.filter(arr => {
      return arr.references === undefined;
    });
    console.log("new annots for the page", pageArray);

    // Fake data for test
    var testData = {
      nodes: [
        {
          id: "A0N0U0C0",
          style: {
            label: "under development"
          },
          loaded: true
        },
        {
          id: "A0N1U1C1",
          style: {
            label: "under development"
          },
          loaded: true
        },
        {
          id: "A0N2U2C2",
          style: {
            label: "under development"
          },
          loaded: true
        }
      ],
      links: [
        {
          id: "LNUC0",
          from: "A0N0U0C0",
          to: this.state.nodeId
        },
        {
          id: "LNUC1",
          from: "A0N1U1C1",
          to: this.state.nodeId
        },
        {
          id: "LNUC2",
          from: "A0N2U2C2",
          to: this.state.nodeId
        }
      ]
    };

    // const pageAnnots = this.props.pageAnnots;
    // if (pageAnnots.length !== 0) {
    //   console.log("all annots on page!!", pageAnnots);
    // }

    const annotArray = array.map(arr => {
      return {
        annotId: arr.id,
        created: arr.created,
        document: arr.document,
        // links: arr.links,
        tags: arr.tags,
        target: arr.target,
        text: arr.text,
        uri: arr.uri,
        incontext: arr.links.incontext,
        user: arr.user.substring(
          arr.user.indexOf(":") + 1,
          arr.user.indexOf("@")
        )
      };
    });
    // console.log("no references:", annotArray);

    const arrayModify = annotArray.reduce((o, cur) => {
      var occurs = o.reduce((n, item, i) => {
        return item.user === cur.user ? i : n;
      }, -1);
      if (occurs >= 0) {
        o[occurs].text = o[occurs].text.concat(cur.text);
        o[occurs].annotId = o[occurs].annotId.concat(cur.annotId);
        o[occurs].uri = o[occurs].uri.concat(cur.uri);
        o[occurs].incontext = o[occurs].incontext.concat(cur.incontext);
      } else {
        var obj = {
          user: cur.user,
          text: [cur.text],
          annotId: [cur.annotId],
          uri: [cur.uri],
          incontext: [cur.incontext]
        };
        o = o.concat([obj]);
      }
      return o;
    }, []);

    // console.log("same user array:", arrayModify);

    // Annots on the same page
    const pageAnnotArray = pageArray.map(arr => {
      return {
        annotId: arr.id,
        created: arr.created,
        document: arr.document,
        // links: arr.links,
        tags: arr.tags,
        target: arr.target,
        text: arr.text,
        uri: arr.uri,
        incontext: arr.links.incontext,
        user: arr.user.substring(
          arr.user.indexOf(":") + 1,
          arr.user.indexOf("@")
        )
      };
    });

    const pageArrayModify = pageAnnotArray.reduce((o, cur) => {
      var occurs = o.reduce((n, item, i) => {
        return item.user === cur.user ? i : n;
      }, -1);
      if (occurs >= 0) {
        o[occurs].text = o[occurs].text.concat(cur.text);
        o[occurs].annotId = o[occurs].annotId.concat(cur.annotId);
        // o[occurs].uri = o[occurs].uri.concat(cur.uri);
        // o[occurs].incontext = o[occurs].incontext.concat(cur.incontext);
      } else {
        var obj = {
          user: cur.user,
          text: [cur.text],
          annotId: [cur.annotId]
          // uri: [cur.uri],
          // incontext: [cur.incontext]
        };
        o = o.concat([obj]);
      }
      return o;
    }, []);

    const newNodesM = [];
    const newNodesT = [];
    const newNodesF = [];

    const newLinksM = [];
    const newLinksT = [];
    const newLinksF = [];

    const newNodesP = [];
    const newNodesA = [];
    // const newNodesG = [];

    const newLinksP = [];
    const newLinksA = [];
    // const newlinksG = [];

    // nodes data
    for (var i = 0; i < arrayModify.length; i++) {
      newNodesM.push({
        id: "A" + i,
        style: {
          label: arrayModify[i].user,
          fillColor: "#65BCF8",
          lineColor: "rgba(89, 168, 223, 0.5)"
        },
        user: true,
        loaded: true
      });
    }

    var newNodesMM = [
      {
        id: "T",
        style: {
          label: selectedTag,
          fillColor: "#912F40",
          lineColor: "rgba(171, 25, 39, 0.5)"
        },
        loaded: true
      },
      ...newNodesM
    ];

    for (var j = 0; j < arrayModify.length; j++) {
      if (arrayModify[j].text.length > 1) {
        for (var k = 0; k < arrayModify[j].text.length; k++) {
          newNodesT.push({
            id: "A" + j + "N" + k,
            style: {
              label: arrayModify[j].text[k],
              fillColor: "#68CF9D",

              lineColor: "rgba(98, 188, 144, 0.5)"
            },
            annotId: arrayModify[j].annotId[k],
            loaded: true,
            multiple: "yes"
          });
          newNodesF.push({
            id: "A" + j + "N" + k + "U" + k,
            style: {
              label: arrayModify[j].uri[k],
              fillColor: "#ffd86e",
              lineColor: "#F4C230",
              lineDash: [10, 5, 2, 5],
              lineWidth: 2
            },
            incontext: arrayModify[j].incontext[k],
            loaded: true,
            multiple: "yes"
          });
        }
      } else {
        newNodesT.push({
          id: "A" + j + "N" + j,
          style: {
            label: arrayModify[j].text[0],
            fillColor: "#68CF9D",

            lineColor: "rgba(98, 188, 144, 0.5)"
          },
          annotId: arrayModify[j].annotId[0],

          loaded: true
        });
        newNodesF.push({
          id: "A" + j + "N" + j + "U" + j,
          style: {
            label: arrayModify[j].uri[0],
            fillColor: "#ffd86e",
            lineColor: "#F4C230",
            lineDash: [10, 5, 2, 5],
            lineWidth: 2
          },
          incontext: arrayModify[j].incontext[0],
          loaded: true
        });
      }
    }

    // Annots on the same page -- nodes data
    for (var i = 0; i < pageArrayModify.length; i++) {
      newNodesP.push({
        id: "C" + i,
        style: {
          label: pageArrayModify[i].user,
          fillColor: "#65BCF8",
          lineColor: "rgba(89, 168, 223, 0.5)"
        },
        user: true,
        loaded: true
      });
    }

    for (var j = 0; j < pageArrayModify.length; j++) {
      if (pageArrayModify[j].text.length > 1) {
        for (var k = 0; k < pageArrayModify[j].text.length; k++) {
          newNodesA.push({
            id: "C" + j + "NN" + k,
            style: {
              label: pageArrayModify[j].text[k],
              fillColor: "#68CF9D",
              lineColor: "rgba(98, 188, 144, 0.5)"
            },
            annotId: pageArrayModify[j].annotId[k],
            loaded: true,
            multiple: "yes"
          });
        }
      } else {
        newNodesA.push({
          id: "C" + j + "NN" + j,
          style: {
            label: pageArrayModify[j].text[0],
            fillColor: "#68CF9D",
            lineColor: "rgba(98, 188, 144, 0.5)"
          },
          annotId: pageArrayModify[j].annotId[0],
          loaded: true
        });
      }
    }

    const newNodes = newNodesMM.concat(
      newNodesT,
      newNodesF,
      newNodesP,
      newNodesA
    );
    // console.log("newNodes", newNodes);

    // links data
    for (var i = 0; i < newNodesM.length; i++) {
      newLinksM.push({
        id: "L" + i,
        from: newNodesM[i].id,
        to: "T",
        type: "creators"
      });
    }

    for (var i = 0; i < newNodesT.length; i++) {
      newLinksT.push({
        id: "LN" + i,
        from: newNodesT[i].id,
        to: newNodesT[i].id.substring(
          newNodesT[i].id.indexOf("A"),
          newNodesT[i].id.indexOf("N")
        ),
        type: "annots"
      });
      newLinksF.push({
        id: "LNU" + i,
        from: newNodesF[i].id,
        to: newNodesF[i].id.substring(
          newNodesF[i].id.indexOf("A"),
          newNodesF[i].id.indexOf("U")
        ),
        type: "uri"
      });
    }

    // Annots on the same page -- links data
    for (var i = 0; i < newNodesP.length; i++) {
      newLinksP.push({
        id: "LL" + i,
        from: newNodesP[i].id,
        to: this.state.nodeId,
        type: "creators"
      });
    }

    for (var i = 0; i < newNodesA.length; i++) {
      newLinksA.push({
        id: "LNN" + i,
        from: newNodesA[i].id,
        to: newNodesA[i].id.substring(
          newNodesA[i].id.indexOf("C"),
          newNodesA[i].id.indexOf("NN")
        ),
        type: "annots"
      });
    }

    var newLinks = newLinksM.concat(newLinksT, newLinksF, newLinksP, newLinksA);
    // console.log("newLinks", newLinks);

    var self = this;
    var selfProps = this.props;

    if (selectedTag !== "") {
      var t = new Chart({
        container: document.getElementById("chartNetChart"),
        area: {
          style: { fillColor: "#f9fbfd" }
        },
        navigation: {
          focusNodeExpansionRadius: 1,
          initialNodes: ["T"],
          // mode: "focusnodes",
          mode: "manual"
          // autoZoomOnFocus: true
        },
        layout: {
          mode: "dynamic",
          nodeSpacing: 30
        },
        style: {
          node: {
            display: "roundtext",
            lineWidth: 5
          },
          nodeStyleFunction: nodeStyle,
          linkStyleFunction: linkStyle,
          link: {
            fillColor: "#D8D8D8"
          },
          nodeHovered: {
            shadowBlur: 1
          },
          linkHovered: {
            shadowBlur: 1
          },
          nodeLabel: {
            textStyle: { fillColor: "white" }
          }
        },
        data: {
          preloaded: {
            nodes: newNodes,
            links: newLinks
          }
        },
        events: {
          onDoubleClick: graphDoubleClick,
          onClick: graghClick
        },
        toolbar: {
          fullscreen: true,
          enabled: true
        },
        interaction: {
          resizing: {
            enabled: false
          },
          zooming: {
            initialAutoZoom: false
          }
        }
      });

      function nodeStyle(node) {
        if (node.hovered) {
          node.radius = 38;
          if (node.data === undefined) {
            return;
          } else if (
            node.data.id.indexOf("N") !== -1 &&
            node.data.id.indexOf("U") === -1
          ) {
            node.items = [
              {
                text: "ANNOTATION",
                backgroundStyle: {
                  fillColor: "rgba(98, 188, 144, 0.8)",
                  lineColor: "transparent"
                },
                textStyle: { fillColor: "white" },
                px: 0,
                py: -1,
                x: 0,
                y: -10,
                aspectRatio: 0,
                scaleWithZoom: true,
                scaleWithSize: true,
                maxWidth: 2,
                padding: 2
              }
            ];
          } else if (
            (node.data.id.indexOf("N") === -1 && node.data.id !== "T") ||
            node.data.id.indexOf("C") !== -1
          ) {
            node.items = [
              {
                text: "USER",
                backgroundStyle: {
                  fillColor: "rgba(89, 168, 223, 0.8)",
                  lineColor: "transparent"
                },
                textStyle: { fillColor: "white" },
                px: 0,
                py: -1,
                x: 0,
                y: -10,
                aspectRatio: 0,
                scaleWithZoom: true,
                scaleWithSize: true,
                maxWidth: 2,
                padding: 2
              }
            ];
          } else if (node.data.id === "T") {
            node.items = [
              {
                text: "TAG",
                backgroundStyle: {
                  fillColor: "rgba(171, 25, 39, 0.8)",
                  lineColor: "transparent"
                },
                textStyle: { fillColor: "white" },
                px: 0,
                py: -1,
                x: 0,
                y: -10,
                aspectRatio: 0,
                scaleWithZoom: true,
                scaleWithSize: true,
                maxWidth: 2,
                padding: 2
              }
            ];
          } else if (node.data.id.indexOf("U") !== -1) {
            node.items = [
              {
                text: "WEB PAGE",
                backgroundStyle: {
                  fillColor: "rgba(255,216,110,0.8)",
                  lineColor: "transparent"
                },
                textStyle: { fillColor: "white" },
                px: 0,
                py: -1,
                x: 0,
                y: -10,
                aspectRatio: 0,
                scaleWithZoom: true,
                scaleWithSize: true,
                maxWidth: 2,
                padding: 2
              }
            ];
          }
        } else {
          node.radius = 30;
          node.items = [
            {
              text: "aaa",
              textStyle: { fillColor: "transparent" },
              backgroundStyle: {
                fillColor: "transparent",
                lineColor: "transparent"
              }
            }
          ];
        }
      }

      function linkStyle(link) {
        if (link.hovered) {
          link.radius = 2;
          link.fillColor = "#979797";
          link.shadowColor = "#979797";
        } else {
          link.radius = 1;
          link.fillColor = "#D8D8D8";
        }
      }

      function graphDoubleClick(event) {
        event.preventDefault();
        // console.log("event data:", event.clickNode.data);
        // console.log("tell me double", event.clickNode);

        if (event.clickNode === undefined) {
          return;
        } else if (event.clickNode.data.annotId) {
          self.setState({
            annotId: event.clickNode.data.annotId,
            visible: true,
            preTag: selectedTag
          });

          // save and restore state

          setTimeout(function() {
            var state = t.saveState();
            self.setState(
              {
                newState: state
              },
              function() {
                console.log("update state:", self.state.newState);
              }
            );
          }, 0);
          console.log("check state:", t.saveState());
          console.log("the state in state", self.state.newState);

          selfProps.fetchFullAnnot(event.clickNode.data.annotId);
        } else if (event.clickNode.data.incontext) {
          // console.log("original page:", event.clickNode.data.incontext);
          window.open(event.clickNode.data.incontext);
        } else if (event.clickNode.data.user) {
          window.open(
            "https://hypothes.is/users/" + event.clickNode.data.style.label
          );
        }
      }
      function graghClick(event) {
        if (event.clickNode === undefined) {
          return;
        } else if (
          event.clickNode.data.incontext &&
          event.clickNode.data.incontext !== self.state.incontext
        ) {
          // console.log("search annot on this page:", event.clickNode.data);

          self.setState({
            nodeId: event.clickNode.data.id,
            incontext: event.clickNode.data.incontext,
            backMap: true,
            preTag: selectedTag
          });

          // save and restore state
          setTimeout(function() {
            var linkState = t.saveState();
            self.setState({
              newState: linkState
            });
          }, 0);

          selfProps.fetchPageAnnots(event.clickNode.data.style.label);
        }
      }

      // save and restore state
      // function restoreNetwork(s) {
      //   if (s !== "" && selectedTag === self.state.preTag) {
      //     t.restoreState(s);
      //   }
      // }
      if (
        self.state.newState !== "" &&
        selectedTag === self.state.preTag &&
        !timeFilter
      ) {
        t.restoreState(self.state.newState);
      }
    }
  }

  handleSidebarHide = () => this.setState({ visible: false });

  renderAnnots() {
    if (this.props.passTag == "") {
      return (
        <div className="img-container">
          <img className="temp-image" src={networkIcon} alt="network icon" />
          <p className="temp-text">
            <span className="text-color-red">Choose</span> or{" "}
            <span className="text-color-blue">Search</span> the Tag <br /> to
            Create Your Personal Learning Network
          </p>
        </div>
      );
    }
  }

  renderBack() {
    if (this.state.backMap === true) {
      return (
        <div>
          <button onClick={() => this.setState({ backMap: false })}>
            click me and back
          </button>
        </div>
      );
    }
  }

  render() {
    const { visible } = this.state;
    const annotData = this.props.fullAnnots;
    return (
      <div className="map-container">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="wide"
            direction="right"
          >
            <AnnotSidebar fullAnnots={{ annotData }} />
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              {/* <div>{this.renderBack()}</div> */}
              <div id="chartNetChart" className="chart" />
              {/* <div>{this.renderBack()}</div> */}

              {/* <p className="cover" /> */}
              <div>{this.renderAnnots()}</div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { fullAnnots: state.fullAnnot };
};

export default connect(
  mapStateToProps,
  { fetchFullAnnot, fetchPageAnnots }
)(NetworkMap);
