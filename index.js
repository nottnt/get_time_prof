const Nightmare = require('nightmare');
const nightmare = Nightmare({  electronPath: require('electron') });
var express = require('express')
var app = express()

app.set('port',(process.env.PORT || 9000))
const URL = 'http://blog.oscarmorrison.com/nightmarejs-on-heroku-the-ultimate-scraping-setup/';
console.log('Welcome to Nightmare scrape\n==========');

nightmare
    .goto(URL)
    .wait('.post-title')
    .evaluate(() => document.querySelector('.post-title').textContent)
    .end()
    .then((result) => {
        console.log(result);
        console.log('=========\nAll done');
    })
    .catch((error) => {
        console.error('an error has occurred: ' + error);
    })
    .then(() => (console.log('process exit'), process.exit()));
