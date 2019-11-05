const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const scraper = require("./scraper");

const app = express();
app.use(express.json());

app.get("/search/:location", (req, res) => {
  scraper
    .scrapeLocations(req.params.location, req.params.id)
    .then(locations => {
      res.json(locations);
    });
});

app.get("/search/weather/:id", (req, res) => {
  scraper.scrapeWeather(req.params.id).then(weather => {
    res.json(weather);
  });
});

app.post("/submit", (req, res) => {
  console.log(req.body.location);
});

/*********************** Wetter in München ***********************/

app.get("/api/weather", (req, res) => {
  const weatherMunich = giveWeatherMunich;
  res.json(weatherMunich);
});

function giveWeatherMunich() {
  let weatherMunich = "";
  request(
    "https://www.wetter.com/wetter_aktuell/wettervorhersage/morgen/deutschland/muenchen/DE0006515.html",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        weatherMunich = $(".json-ld-answer").text();
        console.log(weatherMunich);
      }
    }
  );

  return weatherMunich;
}

// console.log(giveWeatherMunich());

/******************************************************/

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
