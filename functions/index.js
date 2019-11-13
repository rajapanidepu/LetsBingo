const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const cors = require("cors")({
  origin: true
});

exports.nextNumber = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    return getNextNumber().then(value => res.json({ value }));
  });
});

const { dialogflow } = require("actions-on-google");

const {
  SimpleResponse,
  BasicCard,
  Image,
  Suggestions,
  Button
} = require("actions-on-google");

var firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBLk60Mxlxr8AnLDS5b74ANzDWszLENn8s",
  authDomain: "letsbingo-d2734.firebaseapp.com",
  databaseURL: "https://letsbingo2.firebaseio.com/",
  storageBucket: "letsbingo-d2734.appspot.com"
};

firebase.initializeApp(firebaseConfig);

getNextNumber = () => {
  var bingoReference = firebase.database().ref("/bingo/");
  const pickedBingoNumbers = [];

  return new Promise((resolve, reject) => {
    bingoReference.on(
      "value",
      function(snapshot) {
        const records = snapshot.val();
        bingoReference.off("value");

        for (var key in records) {
          pickedBingoNumbers.push(records[key]);
        }
        if (pickedBingoNumbers.length >= 90) {
          resolve("game over");
          // conv.close('game over');
        }
        let nextNumber = parseInt(Math.random() * 100);
        while (
          pickedBingoNumbers.includes(nextNumber) ||
          nextNumber > 90 ||
          nextNumber <= 0
        ) {
          nextNumber = parseInt(Math.random() * 100);
        }
        if (!pickedBingoNumbers.includes(nextNumber)) {
          pickedBingoNumbers.push(nextNumber);
          bingoReference.push(nextNumber);
          resolve(`next number is ${nextNumber}`);
          // conv.close('next number is ' + nextNumber);
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  });
};

const dialogflowApp = dialogflow({ debug: true });

// eslint-diable promise/always-return
dialogflowApp.intent("Next number please", conv => {
  return getNextNumber().then(val => {
    conv.close(val);
    return;
  });
});

exports.fullfillment = functions.https.onRequest(dialogflowApp);
