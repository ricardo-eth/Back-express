const { ethers } = require("ethers");
const express = require("express");
const { exec } = require("child_process");
const fsPromises = require("fs/promises");

// ID INFURA
require("dotenv").config();
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

// SERVER DATA
const app = express();
const IP_LOOPBACK = "localhost";
const PORT = 3333;

//
const LOG_FILE = "logs/access-log.txt";

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

const readLastLog = async () => {
  try {
    const info = await fsPromises
      .readFile(`./${LOG_FILE}`, "utf-8")
      .then((result) => result.split("\n").slice(-2, -1).join());
    console.log(info.split("\n").slice(-2, -1).join());
    return info;
  } catch (e) {
    console.error(e.message);
  }
};

// exercice 1
app.get(
  "/",
  (req, res, next) => {
    logger(req);
    next();
  },
  (req, res) => {
    res.send(`Hello ${req.ip}`);
  }
);

// exercice 3
app.get(
  "/terminal/:cmd",
  (req, res, next) => {
    console.log(`${req.ip} connected`);
    next();
  },
  (req, res) => {
    exec(`${req.params.cmd}`, (error, stdout, stderr) => {
      if (error) {
        res.send(`error: ${error.message}`);
      } else if (stderr) {
        res.send(`error: ${stderr.message}`);
      } else {
        res.send(`stdout: ${stdout}`);
      }
    });
  }
);

app.get(
  "/info",
  (req, res, next) => {
    logger(req);
    next();
  },
  async (req, res) => {
    const info = await readLastLog();
    res.send(
      `Hello ${req.ip}, here's all the informations about you : \n\n ${info}`
    );
  }
);

// exercice 4
app.get("/getBalance", (req, res) => {
  res.send(
    "Hi ! Get the Ether Balance here, Goto url : /getBalance/YOUR_ADRESS_ETH"
  );
});

app.get("/getBalance/:address", async (req, res) => {
  const provider = new ethers.providers.InfuraProvider(
    "rinkeby",
    INFURA_PROJECT_ID
  );
  const address = req.params.address;
  if (ethers.utils.isAddress(address)) {
    const amount = ethers.utils.formatEther(await provider.getBalance(address));
    res.send(
      `l'address : "${
        address.slice(0, 6) + "..." + address.slice(-4)
      }" est en possession de ${amount} ETH`
    );
  } else {
    res.send(`Sorry ${address} is not an ethereum address`);
  }
});

// start the server
app.listen(PORT, IP_LOOPBACK, () => {
  console.log(`Example app listening at http://${IP_LOOPBACK}:${PORT}`);
});
