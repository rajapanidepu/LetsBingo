const bodyParser = require('body-parser');
const express = require("express")();
const http = require("http").Server(express);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

// const { getRandomNumber } = require("./api/lib");

const getNextNumber = require('./api/routes').getNextNumber;

const { dialogflow } = require("actions-on-google");
const {
 SimpleResponse,
 BasicCard,
 Image,
 Suggestions,
 Button
} = require("actions-on-google");

const dialogflowApp = dialogflow({ debug: true });

dialogflowApp.intent('Next number please', conv => {
  return getNextNumber().then(val => {
    conv.close(val);
  });
});

nextApp
  .prepare()
  .then(() => {
    express.use(bodyParser.json());
    express.post("/fulfillment", dialogflowApp);
    express.use("/api", require("./api/routes").router);

    express.get("/p", (req, res) => {
      const actualPage = "/post";
      // const queryParams = { id: req.params.id };
      nextApp.render(req, res, actualPage);
    });

    express.get("/posts/:id", (req, res) => {
      return nextApp.render(req, res, "/posts", {
        id: parseInt(Math.random() * 100)
      });
    });

    express.get("/*", (req, res) => {
      nextHandle(req, res);
    });

    http.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
