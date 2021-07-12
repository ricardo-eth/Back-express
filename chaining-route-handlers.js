// import de express
const express = require("express");
const fsPromises = require("fs/promises");

const LOG_FILE = "access-log.txt";

// async file logger
const logger = async (req) => {
  try {
    const date = new Date();
    const log = `${date.toUTCString()} ${req.method} "${
      req.originalUrl
    }" from ${req.ip} ${req.headers["user-agent"]}\n`;
    await fsPromises.appendFile(LOG_FILE, log, "utf-8");
  } catch (e) {
    console.error(`Error: can't write in ${LOG_FILE}`);
  }
};

// show on console
const shower = async (req) => {
  const date = new Date();
  const log = `${date.toUTCString()} ${req.method} "${req.originalUrl}" from ${
    req.ip
  } ${req.headers["user-agent"]}`;
  console.log(log);
};

const app = express();
const IP_LOOPBACK = "localhost";
const PORT = 3333;

app.get(
  "/hello",
  async (req, res, next) => {
    await logger(req);
    next();
  },
  (req, res, next) => {
    shower(req);
    next();
  },
  (req, res) => {
    res.send(`Hello ${req.ip}`);
  }
);

app.get(
  "/bye",
  async (req, res, next) => {
    await logger(req);
    next();
  },
  (req, res, next) => {
    shower(req);
    next();
  },
  (req, res) => {
    res.send(`Goodbye ${req.ip}`);
  }
);

app.listen(PORT, IP_LOOPBACK, () => {
  //exécution d'un affichage au lacement du serveur.
  console.log(`Example app listening at http://${IP_LOOPBACK}:${PORT}`);
});
