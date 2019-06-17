const express = require("express");
const router = express.Router();

var firebase = require("firebase");
const firebaseConfig = {
 /*<CONFIG HERE> */
};

firebase.initializeApp(firebaseConfig);

// router.post("/", (req, res) => {
//   console.log('something');
//   dialogflowApp.tell('Alrighty See you bye bye !!');
//   res.json({ a: 10 });
//  });

router.get("/", (req, res) => {
  getNextNumber().then(val => {
    res.json({ val });
  })
  // var bingoReference = firebase.database().ref("/bingo/");
  // const pickedBingoNumbers = [];

  // bingoReference.on(
  //   "value",
  //   function(snapshot) {
  //     const records = snapshot.val();
  //     bingoReference.off("value");

  //     for (var key in records) {
  //       console.log(records[key]);
  //       pickedBingoNumbers.push(records[key]);
  //     }
  //     if (pickedBingoNumbers.length > 90) {
  //       res.json({
  //         status: "completed",
  //         length: pickedBingoNumbers.length,
  //         currentNumber: pickedBingoNumbers.join(", ")
  //       });
  //     }
  //     let nextNumber = parseInt(Math.random() * 100);
  //     console.log("====================================");
  //     while (pickedBingoNumbers.includes(nextNumber)) {
  //       nextNumber = parseInt(Math.random() * 100);
  //     }
  //     if (!pickedBingoNumbers.includes(nextNumber)) {
  //       pickedBingoNumbers.push(nextNumber);
  //       bingoReference.push(nextNumber);
  //       res.json({
  //         length: pickedBingoNumbers.length,
  //         currentNumber: pickedBingoNumbers.join(", ")
  //       });
  //     }
  //     console.log("************************************");
  //   },
  //   function(errorObject) {
  //     console.log("The read failed: " + errorObject.code);
  //     res.send("The read failed: " + errorObject.code);
  //   }
  // );

  //   bingoReference.push(parseInt(Math.random() * 100));
});

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
        console.log(records[key]);
        pickedBingoNumbers.push(records[key]);
      }
      if (pickedBingoNumbers.length > 90) {
        resolve('game over');
        // conv.close('game over');
      }
      let nextNumber = parseInt(Math.random() * 100);
      console.log("====================================");
      while (pickedBingoNumbers.includes(nextNumber)) {
        nextNumber = parseInt(Math.random() * 100);
      }
      if (!pickedBingoNumbers.includes(nextNumber)) {
        pickedBingoNumbers.push(nextNumber);
        bingoReference.push(nextNumber);
        resolve(`next number is ${nextNumber}`);
        // conv.close('next number is ' + nextNumber);
      }
      console.log("************************************");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  )
  });
}

module.exports = {router, getNextNumber};
