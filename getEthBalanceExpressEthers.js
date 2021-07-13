const { ethers } = require("ethers");
const express = require("express");
const { exec } = require("child_process");

const app = express();

// ID INFURA
require("dotenv").config();
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

const IP_LOOPBACK = "localhost";
const PORT = 3333;

app.get("/", (req, res) => {
  res.send(
    "Hi ! Get the Ether Balance here, Goto url : /getBalance/YOUR_ADRESS_ETH"
  );
});

// exercice 4
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
