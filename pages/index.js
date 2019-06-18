import React, { Component } from "react";
import firebase from "firebase";
import Spin from "react-reveal/Flip";

const Table = ({ selectedNumbers }) => {
  let number = 1;

  let columns = [];
  for (let i = 0; i < 10; i++) {
    let rows = [];
    for (let j = 0; j < 10; j++) {
      if (selectedNumbers.includes(number)) {
        rows.push(
          <div
            style={{
              fontSize: 30,
              color: "white",
              borderRadius: "40%",
              backgroundColor: "#109648",
              textAlign: "center",
              margin: 5
            }}
          >
            {number}
          </div>
        );
      } else
        rows.push(
          <div
            style={{
              fontSize: 30,
              color: "#d3d3d3",
              borderRadius: "40%",
              textAlign: "center",
              margin: 5
            }}
          >
            {number}
          </div>
        );
      number++;
    }
    columns.push(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 60
        }}
      >
        {rows}
      </div>
    );
  }
  return <div style={{ display: "flex" }}>{columns}</div>;
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bingoVals: [],
      sortedVals: []
    };
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBLk60Mxlxr8AnLDS5b74ANzDWszLENn8s",
      authDomain: "letsbingo-d2734.firebaseapp.com",
      databaseURL: "https://letsbingo-d2734.firebaseio.com",
      storageBucket: "letsbingo-d2734.appspot.com"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();
    var bingoRef = database.ref("bingo/");
    bingoRef.on("value", snapshot => {
      const bingoVals = snapshot.val() || {};
      this.updateVals(Object.values(bingoVals));
    });
  }

  render() {
    return (
      <div style={{ background: "#F7F0F0" }}>
        <div style={{ textAlign: "center", color: "#484349", fontSize: 90 }}>
          Lets Bingo!
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "30px",
              display: "flex",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Table selectedNumbers={this.state.sortedVals} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                border: "10px solid turquoise",
                background: "#8AF3FF",
                fontSize: 350,
                textAlign: "center",
                color: "#484349",
                height: "96%"
              }}
            >
              {this.state.bingoVals.slice(-1).pop()}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h1>Previous numbers</h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {this.state.bingoVals.map((o, i) => (
              <span
                style={{
                  background: "#8AF3FF",
                  border: "#484349 solid 1px",
                  padding: 8,
                  fontSize: 30,
                  color: "#484349",
                  opacity: i / this.state.bingoVals.length
                }}
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  updateVals(bingoVals) {
    this.setState({ bingoVals });
    this.updateAllBingoVals(bingoVals);
  }

  updateAllBingoVals(bingoVals) {
    let allBingoVals = [];
    for (let i = 0; i < 90; i++) {
      if (bingoVals.includes(i + 1)) {
        allBingoVals[i] = i + 1;
      } else {
        allBingoVals[i] = "";
      }
    }
    this.setState({ sortedVals: allBingoVals });
  }
}

export default Home;
