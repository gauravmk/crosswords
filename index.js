const express = require("express");
const rp = require("request-promise");
const app = express();
app.use(express.static('public'))
app.set('view engine', 'pug')

app.get("/", function(req, res) {
  res.send("Dat Crossword Site");
});

app.get("/:year-:month-:day", function(req, res) {
  const { year, month, day } = req.params;
  const url = `https://www.nytimes.com/svc/crosswords/v2/puzzle/daily-${year}-${month}-${day}.json`
  const jar = rp.jar();
  const cookie = rp.cookie(`NYT-S=1owNgcqzHieibU6FN9lbz4EsZq6W84oCOfLmaGjrBuSW7JrIojy4HW5bbeKpPyM.8isIBqltGHSamwobwO1clL9xvTvNSIWusuWRr6OkbThsLlfp5eLfv6Mg00`);
  jar.setCookie(cookie, url)
  rp({ url, jar, json: true }).then((jsonResp) => {
    const puzz = jsonResp.results[0].puzzle_data;
    res.render('index', { puzz });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Started server on port ${port}`);
});
