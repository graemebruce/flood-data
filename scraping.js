//Dependencies
var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//local server stuff
var app = express();
var port = 8000;
//empty array for results
var data = [];
//csv to place data
var outputFile = 'water_levels.csv';
//
// var destination = fs.createWriteStream("./downloads/riverlevels6.csv");
//url to scrape
var url = "http://www.winnipeg.ca/publicworks/pwddata/riverlevels/"
  // cron.schedule('*/1 * * * *', function(){
  //select table data
request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var level = $('table[name=RED] tr:nth-child(6) td:nth-child(2)');
    var time = $('table[name=RED] tr:nth-child(6) td:nth-child(4)');
    //turn it into text
    var leveltext = level.text();
    var timetext = time.text();




// parse the weird city date/time format
var dateParse = new Date(timetext);


//turn Unix Epoch time string into human numbers
var theDay = dateParse.getDate(),
    theMonth = dateParse.getMonth() + 1,
    theHour = dateParse.getHours(),
    theMinutes = dateParse.getMinutes(),
    theSeconds = dateParse.getSeconds();




  
   


    console.log(theMinutes);



var timeOfDay = theHour +':' + theMinutes;
var date = theDay + '/' + theMonth


console.log(date, timeOfDay);



  




  //concantenate level, time
data = ['2017',date, leveltext, '\r\n'];
fs.appendFile(outputFile, data, 'utf8', function(err) {
if (err) {
  console.log('Some error occured - file either not saved or corrupted file saved.');
} else {
  console.log('It is saved!');
}
});
//push to empty array
// entries.push(data);
// console.log(entries)
})
// });
