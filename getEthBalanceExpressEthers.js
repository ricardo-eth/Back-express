const express = require("express");
const app = express();
import { InfuraProvider } from "@ethersproject/providers";

// ID INFURA
require("dotenv").config();
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

const IP_LOOPBACK = "localhost";
const PORT = 3000;

const provider = new InfuraProvider("Rinkeby", INFURA_PROJECT_ID);

app.get("/", (req, res) => {
  res.send(
    "Hi ! Get the Ether Balance here, Goto url : /getBalance/YOUR_ADRESS_ETH"
  );
});

app.get("/getBalance/:address", async (req, res) => {
  res.send(provider.getBalance(req.params.address));
});

app.listen(PORT, async () => {
  console.log(`App listening at http://${IP_LOOPBACK}:${PORT}`);
});
