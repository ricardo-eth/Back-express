const Web3 = require("web3");
const express = require("express");
const app = express();

const IP_LOOPBACK = "localhost";
const PORT = 3000;

// ID INFURA
require("dotenv").config();
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
  )
);

app.get("/", (req, res) => {
  res.send(
    "Hi ! Get the Ether Balance here, Goto url : /getBalance/YOUR_ADRESS_ETH"
  );
});

// GET sur '/getBalance/:adress'
app.get(
  "/getBalance/:adress",
  (req, res, next) => {
    console.log(` from ${req.ip} access to ${req.originalUrl}`);
    next();
  },
  (req, res) => {
    const adress = req.params.adress;

    // Get balance via web3
    web3.eth.getBalance(adress, function (err, result) {
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
