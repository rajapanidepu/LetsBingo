import React, { Component } from "react";
import socketIOClient from "socket.io-client";

export default class extends Component {
  state = {};
  static getInitialProps({ query: { id } }) {
    return { postId: id };
  }

  componentDidMount() {
    const socket = socketIOClient();
    socket.on("FromAPI", data => {
      console.log("===>>>", data);
      this.setState({ response: data });
    });

    socket.on("now", data => {
      console.log("===>>>", data);
      this.setState({ response: data });
    });
  }

  render() {
    return (
      <div>
        <h1>My blog post #{this.props.postId}</h1>
        <h1>My blog post #{this.state.response}</h1>

        <p />
      </div>
    );
  }
}
