import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class chat extends Component {
  state = {
    username: "",
    message: "",
    messages: [],
    userType: "",
    endpoint: "http://localhost:5000"
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(
        res =>
          this.setState({
            userType: res.express.type,
            username: res.express.userName
          }),
        function() {
          console.log(this.state.userType);
        }
      )

      .catch(err => console.log(err));
    var that = this;
    const socket = socketIOClient(this.state.endpoint);
    socket.on("RECEIVE_MESSAGE", function(data) {
      that.addMessage(data);
    });
  }

  callBackendAPI = async () => {
    const response = await fetch("/api/user/data");
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  addMessage = data => {
    console.log(data);
    this.setState({ messages: [...this.state.messages, data] });
    console.log(this.state.messages);
  };

  sendMessage = ev => {
    const socket = socketIOClient(this.state.endpoint);
    ev.preventDefault();
    socket.emit("SEND_MESSAGE", {
      user: this.state.username,
      message: this.state.message
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Chat Room</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div>
                        {message.user}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer">
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button
                  onClick={this.sendMessage}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default chat;
