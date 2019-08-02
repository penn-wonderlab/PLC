import "../css/Sidebar.css";
import React from "react";
import { Menu } from "semantic-ui-react";

class AnnotSidebar extends React.Component {
  renderTags() {
    const annotData = this.props.fullAnnots.annotData;
    if (annotData.user) {
      return this.props.fullAnnots.annotData.tags.map(tag => {
        return (
          <div className="ui horizontal list sidebar-tag" key={tag}>
            <p className="item tag-item annot-tag">{tag}</p>
          </div>
        );
      });
    }
  }

  // htmlDecode(input) {
  //   var e = document.createElement("div");
  //   e.innerHTML = input;
  //   return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  // }

  render() {
    const annotData = this.props.fullAnnots.annotData;
    console.log("sidebar data", annotData);

    if (annotData.user) {
      var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
      var imgs = /(https?:\/\/.*\.(?:jpeg|jpg|png|gif))/i;
      console.log("annot data text", annotData.text);

      if (annotData.text.match(urls) && !annotData.text.match(imgs)) {
        if (annotData.text.includes("a href")) {
          annotData.text = annotData.text.replace(
            /<a href=/gi,
            '<a target="_blank" href='
          );
        } else if (annotData.text.includes("iframe")) {
          console.log("iframe:", annotData.text);
        } else {
          annotData.text = annotData.text.replace(
            urls,
            '<a href="$1" target="_blank">$1</a>'
          );
        }
        console.log("come on!");
      } else if (annotData.text.match(/\.(jpeg|jpg|png|gif)/g)) {
        var regex = /(https?:\/\/.*\.(?:png|jpg))/i;
        annotData.text = annotData.text
          .replace("![]", "")
          .replace(/[()]/g, "")
          .replace(
            regex,
            '<img src="$1" width="100%" style="margin-bottom: 2rem; margin-top: 1rem;"></img>'
          );
        var nonImgUrl = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim;
        if (annotData.text.match(nonImgUrl)) {
          if (annotData.text.includes("a href")) {
            annotData.text = annotData.text.replace(
              nonImgUrl,
              '<a target="_blank" href='
            );
          } else if (annotData.text.includes("iframe")) {
            console.log("iframe:", annotData.text);
          } else {
            annotData.text = annotData.text.replace(
              nonImgUrl,
              '<a href="$1" target="_blank">$1</a>'
            );
          }
        }

        console.log("come on baby!");
      }

      var user = annotData.user.substring(
        annotData.user.indexOf(":") + 1,
        annotData.user.indexOf("@")
      );
      var tags = annotData.tags.join(" | ");
      var link = annotData.links.incontext;
      var userLink = "https://hypothes.is/users/" + user;
      var time = annotData.created.substring(0, annotData.created.indexOf("T"));
      if (annotData.target[0].selector !== undefined) {
        const seleLength = annotData.target[0].selector.length;
        const realIndex = seleLength - 1;
        var target = annotData.target[0].selector[realIndex].exact;
      } else {
        var target = "";
      }
    }

    return (
      <div className="sidebar-content">
        <Menu.Item>
          <div className="ui">
            <div className="basic-info">
              <p className="user-info">
                <i className="user icon lar" />
                <span className="user-name">Annotator: </span>{" "}
                <a href={userLink} target="_blank" className="user-link">
                  {user}
                </a>
              </p>
              <p className="annot-info">
                <i className="linkify icon mid" />
                <a href={link} target="_blank" className="context-link">
                  Visit annotation in context
                </a>
              </p>
              <p className="annot-info">
                <i className="tag icon mid" />
                Tags
              </p>
              <p className="tag-info">{tags}</p>
            </div>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div className="full-info">
            <div className="time-info">
              <p className="public">Public</p>
              <p className="create-time">{time}</p>
            </div>
            <p className="target-info">{target}</p>
            {/* <p className="text-info">{annotData.text}</p> */}

            <div
              className="text-info"
              dangerouslySetInnerHTML={{
                __html: annotData.text
              }}
            />

            <div>{this.renderTags()}</div>
          </div>
        </Menu.Item>
      </div>
    );
  }
}

export default AnnotSidebar;
