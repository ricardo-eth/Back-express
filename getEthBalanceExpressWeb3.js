const Web3 = require("web3");
const express = require("express");
const fsPromises = require("fs/promises");
const app = express();

const IP_LOOPBACK = "localhost";
const PORT = 3333;

const LOG_FILE = "access-log.txt";

// ID INFURA
require("dotenv").config();
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
  )
);

// async file logger
const logger = async (req) => {
  try {
    const date = new Date();
    const log = `${date.toUTCString()} ${req.method} "${req.path}" ${
      req.balance
    } from ${req.ip} ${req.headers["user-agent"]}\n`;
    await fsPromises.appendFile(LOG_FILE, log, "utf-8");
  } catch (e) {
    console.error(`Error: can't write in ${LOG_FILE}`);
  }
};

// show on console
const shower = async (req) => {
  const date = new Date();
  const log = `${date.toUTCString()} ${req.method} "${req.path}" ${
    req.balance
  } from ${req.ip} ${req.headers["user-agent"]}`;
  console.log(log);
};

app.get("/", (req, res) => {
  res.send(
    "Hi ! Get the Ether Balance here, Goto url : /getBalance/YOUR_ADRESS_ETH"
  );
});

// GET sur '/getBalance/:adress'
app.get(
  "/getBalance/:adress",
  async (req, res, next) => {
    await logger(req);
    next();
  },
  (req, res, next) => {
    shower(req);
    next();
  },
  (req, res) => {
    const address = req.params.adress;

    // Get balance via web3
    web3.eth.getBalance(address, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const balance = web3.utils.fromWei(result, "ether");

        res.send(`Your have ${balance} ETH`);
      }
    });
  }
);

// start the server
app.listen(PORT, IP_LOOPBACK, () => {
  console.log(`Example app listening at http://${IP_LOOPBACK}:${PORT}`);
});
