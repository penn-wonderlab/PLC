import "../css/Login.css";
import React from "react";
import Auth from "./Auth";

class Login extends React.Component {
  state = {
    username: "",
    // userLogged: false,
    error: false
  };

  onInputChange = e => {
    this.setState({ username: e.target.value });
  };

  onLoginSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    const { history } = this.props;
    this.setState({ error: false });

    if (username === "") {
      return this.setState({ error: true });
    }

    this.props.onNameSubmit(this.state.username);

    Auth.login(() => {
      this.props.history.push({
        pathname: "/dashboard",
        state: { username: this.state.username }
      });
    });
  };

  render() {
    const { error } = this.state;

    return (
      <div className="ui container login-container">
        <h4>Login With Your Hypothesis User Name</h4>
        <div className="login-text">
          <form
            className="ui form"
            onSubmit={this.onLoginSubmit}
            error={error ? 1 : 0}
          >
            <div className="field">
              <label>Hypothesis User Name</label>
              <input
                onChange={this.onInputChange}
                type="text"
                name="api-token"
                placeholder="User Name..."
              />
            </div>
            <div className="field">
              {/* <label className="api-label">
                You can generate a personal API token via Hypothesis Settings >
                Developer
              </label> */}
              <label className="api-label">
                After you logged in Hypothesis, you can find your user name in
                the top navigation bar.
              </label>
            </div>
            <button className="ui primary button" type="submit">
              Login Now
            </button>

            {error && (
              <div className="ui left pointing red basic label">
                Please enter a value!
              </div>
            )}
          </form>

          {/* <Link to={{ pathname: "/dashboard", state: { foo: "bar" } }}>
            <button className="ui primary button">Set Token</button>
          </Link> */}
        </div>
        <div className="ui horizontal divider">Or</div>
        <a href="https://web.hypothes.is/" target="_blank">
          <button className="ui primary button">
            Create Hypothesis Account
          </button>
        </a>
      </div>
    );
  }
}

export default Login;
