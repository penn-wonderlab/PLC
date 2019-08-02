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
  "ZCP-dq3x184y6: ZoomCharts SDK Internal Use license for University of Minnesota. Valid for 1 chart developer and 1 external site license";
window.ZoomChartsLicenseKey =
  "9ecdcfd309df4b4a9bb8ffca5c2f3c0561911045d450c36abc" +
  "65fd86ce49f03a893df118954e43bae3c044def8f1561828f71b123765f399104720eff951e74" +
  "3c7e68f18633262026c2cb4350f0e7cee21923ec226f943df31aa64c1f36c35bf660407fa18ea" +
  "2701c1b52d6576340539a77d626789b65c4d6b66905da423631579634876a14661d2ffd77660b" +
  "43c2ffed1e2d2b91932ac0aba5fc3be4247e9a9d68ff05c0136929f7ef203af579cda1b2d9190" +
  "6fc667d50ecd307e2cd3317636a757e00a27a3992fb01556669142c8f2f2bdc32d7f9f349de32" +
  "a2afc2f7e25e3834b2390355d521a3fa3a2ba1e14c235710583b6ed0f4f2aada16ceaf43a75d0";

class NetworkMap extends React.Component {
  state = {
    annotId: "",
    visible: false,
    preTag: "",
    nodeId: "",
    incontext: "",
    backMap: this.props.backMap,
    newState: "",
    reload: true,
    reloadPage: true
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

    var array = filterArray.filter(arr => {
      return arr.references === undefined;
    });
    console.log("array:", array);

    // Image & link display
    var self = this;

    function displayImgLink(chartData) {
      if (self.state.reload) {
        for (var i = 0; i < chartData.length; i++) {
          var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
          var imgs = /(https?:\/\/.*\.(?:jpeg|jpg|png|gif))/i;

          if (chartData[i].text.match(urls) && !chartData[i].text.match(imgs)) {
            console.log("look! have url and image!", chartData[i].text);
            if (chartData[i].text.includes("a href")) {
              chartData[i].text = chartData[i].text.replace(
                /<a href=/gi,
                '<a target="_blank" href='
              );
            } else if (chartData[i].text.includes("iframe")) {
              console.log("iframe:", chartData[i].text);
            } else {
              chartData[i].text = chartData[i].text.replace(
                urls,
                '<a href="$1" target="_blank">$1</a>'
              );
            }
          } else if (chartData[i].text.match(/\.(jpeg|jpg|png|gif)/g)) {
            var regex = /(https?:\/\/.*\.(?:png|jpg))/i;
            chartData[i].text = chartData[i].text
              .replace("![]", "")
              .replace(/[()]/g, "")
              .replace(
                regex,
                '<img src="$1" width="50%" style="margin-bottom: 0.2rem; margin-top: 0.2rem; margin-left: auto; margin-right: auto; float: none; display: block"></img>'
              );
            var nonImgUrl = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim;
            if (chartData[i].text.match(nonImgUrl)) {
              if (chartData[i].text.includes("a href")) {
                chartData[i].text = chartData[i].text.replace(
                  nonImgUrl,
                  '<a target="_blank" href='
                );
              } else if (chartData[i].text.includes("iframe")) {
                console.log("iframe:", chartData[i].text);
              } else {
                chartData[i].text = chartData[i].text.replace(
                  nonImgUrl,
                  '<a href="$1" target="_blank">$1</a>'
                );
              }
            }
          }
          if (i === chartData.length - 1) {
            console.log("hahahhahaha:", i);
            self.setState({
              reload: false
            });
          }
        }
      }
    }

    function displayImgLinkPage(chartDataPage) {
      if (self.state.reloadPage) {
        for (var i = 0; i < chartDataPage.length; i++) {
          var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
          var imgs = /(https?:\/\/.*\.(?:jpeg|jpg|png|gif))/i;

          if (
            chartDataPage[i].text.match(urls) &&
            !chartDataPage[i].text.match(imgs)
          ) {
            console.log("look! have url and image!", chartDataPage[i].text);
            if (chartDataPage[i].text.includes("a href")) {
              chartDataPage[i].text = chartDataPage[i].text.replace(
                /<a href=/gi,
                '<a target="_blank" href='
              );
            } else if (chartDataPage[i].text.includes("iframe")) {
              console.log("iframe:", chartDataPage[i].text);
            } else {
              chartDataPage[i].text = chartDataPage[i].text.replace(
                urls,
                '<a href="$1" target="_blank">$1</a>'
              );
            }
          } else if (chartDataPage[i].text.match(/\.(jpeg|jpg|png|gif)/g)) {
            var regex = /(https?:\/\/.*\.(?:png|jpg))/i;
            chartDataPage[i].text = chartDataPage[i].text
              .replace("![]", "")
              .replace(/[()]/g, "")
              .replace(
                regex,
                '<img src="$1" width="50%" style="margin-bottom: 0.2rem; margin-top: 0.2rem; margin-left: auto; margin-right: auto; float: none; display: block"></img>'
              );
            var nonImgUrl = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim;
            if (chartDataPage[i].text.match(nonImgUrl)) {
              if (chartDataPage[i].text.includes("a href")) {
                chartDataPage[i].text = chartDataPage[i].text.replace(
                  nonImgUrl,
                  '<a target="_blank" href='
                );
              } else if (chartDataPage[i].text.includes("iframe")) {
                console.log("iframe:", chartDataPage[i].text);
              } else {
                chartDataPage[i].text = chartDataPage[i].text.replace(
                  nonImgUrl,
                  '<a href="$1" target="_blank">$1</a>'
                );
              }
            }
          }
          if (i === chartDataPage.length - 1) {
            console.log("hahahhahaha:", i);
            self.setState({
              reloadPage: false
            });
          }
        }
      }
    }

    // if (self.state.reload) {
    //   for (var i = 0; i < array.length; i++) {
    //     var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
    //     var imgs = /(https?:\/\/.*\.(?:jpeg|jpg|png|gif))/i;

    //     if (array[i].text.match(urls) && !array[i].text.match(imgs)) {
    //       console.log("look! have url and image!", array[i].text);
    //       if (array[i].text.includes("a href")) {
    //         array[i].text = array[i].text.replace(
    //           /<a href=/gi,
    //           '<a target="_blank" href='
    //         );
    //       } else if (array[i].text.includes("iframe")) {
    //         console.log("iframe:", array[i].text);
    //       } else {
    //         array[i].text = array[i].text.replace(
    //           urls,
    //           '<a href="$1" target="_blank">$1</a>'
    //         );
    //       }
    //     } else if (array[i].text.match(/\.(jpeg|jpg|png|gif)/g)) {
    //       var regex = /(https?:\/\/.*\.(?:png|jpg))/i;
    //       array[i].text = array[i].text
    //         .replace("![]", "")
    //         .replace(/[()]/g, "")
    //         .replace(
    //           regex,
    //           '<img src="$1" width="50%" style="margin-bottom: 0.2rem; margin-top: 0.2rem; margin-left: auto; margin-right: auto; float: none; display: block"></img>'
    //         );
    //       var nonImgUrl = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim;
    //       if (array[i].text.match(nonImgUrl)) {
    //         if (array[i].text.includes("a href")) {
    //           array[i].text = array[i].text.replace(
    //             nonImgUrl,
    //             '<a target="_blank" href='
    //           );
    //         } else if (array[i].text.includes("iframe")) {
    //           console.log("iframe:", array[i].text);
    //         } else {
    //           array[i].text = array[i].text.replace(
    //             nonImgUrl,
    //             '<a href="$1" target="_blank">$1</a>'
    //           );
    //         }
    //       }
    //     }
    //     if (i === array.length - 1) {
    //       console.log("hahahhahaha:", i);
    //       self.setState({
    //         reload: false
    //       });
    //     }
    //   }
    // }

    // console.log("this is the new array", array);

    const pageArray = this.props.searchedAnnots.Pagedata.filter(arr => {
      return arr.references === undefined;
    });
    console.log("new annots for the page", pageArray);

    displayImgLink(array);
    displayImgLinkPage(pageArray);

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
        selection: {
          enabled: true
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
