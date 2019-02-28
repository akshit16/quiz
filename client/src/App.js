import React, { Component } from "react";
import "./App.css";
import adminHome from "./Components/admin/home.jsx";
import adminLogin from "./Components/admin/loginAdmin.jsx";
import userLogin from "./Components/user/login.jsx";
import register from "./Components/user/register.jsx";
import userHome from "./Components/user/home.jsx";
import quiz from "./Components/user/quiz.jsx";
import chat from "./Components/user/chat.jsx";

import {
  Route,
  Link,
  browserHistory,
  HashRouter,
  BrowserRouter
} from "react-router-dom";

class App extends Component {
  state = {
    adminsession: ""
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={userLogin} />
          <Route exact path="/register" component={register} />
          <Route exact path="/home" component={userHome} />
          <Route exact path="/quiz" component={quiz} />
          <Route exact path="/chat" component={chat} />

          <Route exact path="/admin" component={adminLogin} />
          <Route exact path="/adminHome" component={adminHome} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
