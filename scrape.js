const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.wetter.com/wetter_aktuell/wettervorhersage/morgen/deutschland/muenchen/DE0006515.html",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const wetter = $(".json-ld-answer");

      console.log(wetter.text());
    }
  }
);
