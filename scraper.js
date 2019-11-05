const cheerio = require("cheerio");
const fetch = require("node-fetch");

const urlSearch = "https://www.wetter.com/suche/?q=";
const urlWeatherDisplay = "https://www.wetter.com/deutschland/";

function scrapeLocations(location) {
  return fetch(`${urlSearch}${location}`)
    .then(response => response.text())
    .then(body => {
      const locations = [];
      const $ = cheerio.load(body);
      $(".result_groups li a").each(function(i, element) {
        const $element = $(element);
        let id = $element.attr("href").match(/deutschland\/(.*)\/(.*)\.html/);

        if (id) {
          id = id[2];
        }
        const location = {
          name: $element.text(),
          id
        };
        locations.push(location);
      });
      return locations;
    });
}

function scrapeWeather(id) {
  return fetch(`${urlWeatherDisplay}${id}.html`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const weather = $(".json-ld-answer").text();
      return weather;
    });
}

module.exports = {
  scrapeWeather,
  scrapeLocations
};
