const express = require("express");
const app = express();

const IP_LOOPBACK = "localhost";
const IP_LOCAL = "xxx.xxx.x.xx"; // my local ip on my network
const PORT = 3000;

// GET sur la racine
app.get(
  "/",
  (req, res, next) => {
    console.log(` from ${req.ip} access to ${req.originalUrl}`);
    next();
  },
  (req, res) => {
    //nous recupérons l'ip source de la requête
    res.send(`Welcome ${req.ip} to my first express app.`);
  }
);

// POST sur la racine
app.post(
  "/",
  (req, res, next) => {
    console.log(` from ${req.ip} access to ${req.originalUrl}`);
    next();
  },
  (req, res) => {
    res.send("Sorry we don't post requests yet.");
  }
);

// GET sur '/hello'
app.get(
  "/hello",
  (req, res, next) => {
    console.log(` from ${req.ip} access to ${req.originalUrl}`);
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// GET sur '/hello/franck'
app.get("/hello/franck", (req, res) => {
  res.send("Hello Franck!");
});

// GET sur '/hello/:name'
app.get(
  "/hello/:name",
  (req, res, next) => {
    console.log(` from ${req.ip} access to ${req.originalUrl}`);
    next();
  },
  (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}!`);
  }
);

// GET sur '/hello/:name'
app.get(
  "/planet/:planetId",
  (req, res, next) => {
    console.log(` from ${req.ip} access to ${req.originalUrl}`);
    next();
  },
  (req, res) => {
    const planetID = req.params.planetId;
    res.send(
      `Plante with id ${planetID} for client ${req.ip} not implementd yet`
    );
  }
);

// start the server
app.listen(PORT, IP_LOOPBACK, () => {
  console.log(`Example app listening at http://${IP_LOOPBACK}:${PORT}`);
});
