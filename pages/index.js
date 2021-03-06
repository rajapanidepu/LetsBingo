import React, { Component } from "react";
import firebase from 'firebase';
import Spin from 'react-reveal/Flip';
import { Table } from './components/table';

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
      storageBucket: "letsbingo-d2734.appspot.com",
    };
    firebase.initializeApp(config);
  
    // Get a reference to the database service
    var database = firebase.database();
    var bingoRef = database.ref('bingo/');
    bingoRef.on('value', (snapshot) => {
      const bingoVals = snapshot.val() || {};
      this.updateVals(Object.values(bingoVals));
    });
  }

  render() {
    return (
      <div>
        <h1>Lets Bingo!</h1>
        <div style={{ display: 'flex' }}>
          <Table
            selectedNumbers={this.state.sortedVals}
            style={{ flex: 1 }}
          />
          <Spin>
            <div style={{ flex: 1 }}>
              <div>next number: </div>
              <div 
                style={{ border: '10px solid turquoise', background: 'turquoise', fontSize: 300, textAlign: 'center', color: 'darkslategrey' }}
              >
                {this.state.bingoVals.slice(-1).pop()}
              </div>
            </div>
          </Spin>
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
    for(let i=0; i<90; i++) {
      if(bingoVals.includes(i+1)) {
        allBingoVals[i] = i+1;
      } else {
        allBingoVals[i] = '';
      }
    }
    this.setState({ sortedVals: allBingoVals });
  }
}

export default Home;
