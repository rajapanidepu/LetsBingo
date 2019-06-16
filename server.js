const express = require("express")();
const http = require("http").Server(express);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

const { getRandomNumber } = require("./api/lib");

nextApp
  .prepare()
  .then(() => {
    express.use("/api", require("./api/routes"));

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

    http.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
