import "../css/Header.css";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Auth from "./Auth";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.renderLogout = this.renderLogout.bind(this);
    // this.state = {
    //   checkAuth: this.props.checkAuth
    // };
  }

  renderLogout = () => {
    // this.setState({
    //   checkAuth: false
    // });
    Auth.logout(() => {
      this.props.history.push({
        pathname: "/"
      });
    });
  };

  render() {
    // console.log("header props", this.props.username);
    // console.log("authentication", Auth.isAuthenticated());
    const { checkAuth } = this.props;
    const { username } = this.props;
    const authenticated = Auth.isAuthenticated();

    console.log("check header auth:", this.props.checkAuth);
    // console.log(username ? "yes" : "no");
    return (
      <div className="ui secondary fixed pointing menu header">
        {authenticated ? (
          <Link to="/dashboard" className="item">
            <i className="fas fa-compass header-icon" />
            Personal Learning Compass
          </Link>
        ) : (
          <Link to="/" className="item">
            <i className="fas fa-compass header-icon" />
            Personal Learning Compass
          </Link>
        )}
        {/* <Link to="/" className="item">
          <i className="fas fa-rocket header-icon" />
          Personal Learning Booster
        </Link> */}
        <div className="right menu">
          <a
            href="https://github.com/Wenjing5431/PLB_Capstone"
            target="_blank"
            className="item"
          >
            Github
          </a>

          {authenticated ? (
            <span className="header-span">
              <p className="item">{username}</p>
              <a className="item" onClick={this.renderLogout}>
                Logout
              </a>
            </span>
          ) : (
            <span className="header-span">
              <Link to="" className="item">
                About Us
              </Link>
              <Link to="/login" className="item login">
                Get Started
              </Link>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
