var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');
var app = express();

const languages = {
  en: {
    url: 'https://www.sgi.org/about-us/president-ikedas-writings/daily-encouragement',
    query: '.enc_content p:nth-of-type(1)'
  },
  es: {
    url: 'https://www.sgi.org/es/acerca-de-nosotros/escritos-del-presidente-ikeda/aliento-diario',
    query: '.enc_content p:nth-of-type(2)'
  }
};

app.get('/', function (request, response) {
  const langParam = (String(request.query.lang) in languages)
    ? String(request.query.lang)
    : 'en';
  const language = languages[langParam];

  axios.get(language.url).then(result => {
    const root = cheerio.load(result.data);
    const encouragement = root(language.query).text()

    response.json({encouragement});
  }).catch(error => {
    response.status(500).send();
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});