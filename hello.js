// import de express
const express = require("express");

// definition de notre app
const app = express();

// le port d'écoute de notre serveur
const PORT = 3333;

// définition d'une route '/', la route par défaut.
// lorsqu'un client effectuera une requête sur ce endpoint
// on lui retournera le texte 'Hello World!' via la callback/
// Cette callback est aussi appellée 'handler function'
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// démarrage de notre serveur sur le port 3000
app.listen(PORT, () => {
  //exécution d'un affichage au lacement du serveur.
  console.log(`Example app listening at http://localhost:${PORT}`);
});
