const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Dat Crossword Site");
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Started server on port ${port}`);
});
