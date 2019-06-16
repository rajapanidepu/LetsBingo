const express = require("express");
const router = express.Router();

var firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBLk60Mxlxr8AnLDS5b74ANzDWszLENn8s",
  authDomain: "letsbingo-d2734.firebaseapp.com",
  databaseURL: "https://letsbingo-d2734.firebaseio.com",
  projectId: "letsbingo-d2734",
  storageBucket: "letsbingo-d2734.appspot.com",
  messagingSenderId: "230905857234",
  appId: "1:230905857234:web:41e10ea11292e047"
};

firebase.initializeApp(firebaseConfig);

router.get("/", (req, res) => {
  var bingoReference = firebase.database().ref("/bingo/");
  const pickedBingoNumbers = [];

  bingoReference.on(
    "value",
    function(snapshot) {
      const records = snapshot.val();
      bingoReference.off("value");

      for (var key in records) {
        console.log(records[key]);
        pickedBingoNumbers.push(records[key]);
      }
      if (pickedBingoNumbers.length > 90) {
        res.json({
          status: "completed",
          length: pickedBingoNumbers.length,
          currentNumber: pickedBingoNumbers.join(", ")
        });
      }
      let nextNumber = parseInt(Math.random() * 100);
      console.log("====================================");
      while (pickedBingoNumbers.includes(nextNumber)) {
        nextNumber = parseInt(Math.random() * 100);
      }
      if (!pickedBingoNumbers.includes(nextNumber)) {
        pickedBingoNumbers.push(nextNumber);
        bingoReference.push(nextNumber);
        res.json({
          length: pickedBingoNumbers.length,
          currentNumber: pickedBingoNumbers.join(", ")
        });
      }
      console.log("************************************");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );

  //   bingoReference.push(parseInt(Math.random() * 100));
});

module.exports = router;
