import "../css/App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";
import RootPage from "./RootPage";
import Login from "./Login";
import AnnotList from "./AnnotList";
import { ProtectedRoute } from "./ProtectedRoute";
import { RandomPage } from "./404Page";

class App extends React.Component {
  state = {
    username: ""
  };

  LoginHandler = item => {
    console.log("pass from login:", item);
    this.setState({ username: item });
  };

  render() {
    return (
      // <div className="ui container">
      //   <AnnotList />
      // </div>
      <div className="app">
        {/* <BrowserRouter>
          <div> */}
        <Header username={this.state.username} />
        <Switch>
          <Route path="/" exact component={RootPage} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} onNameSubmit={this.LoginHandler} />
            )}
          />
          <ProtectedRoute path="/dashboard" component={AnnotList} />
          <Route path="*" component={RandomPage} />
        </Switch>
        {/* <Footer /> */}
        {/* </div>
        </BrowserRouter> */}
      </div>
    );
  }
}

export default App;
