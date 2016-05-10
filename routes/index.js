var express = require('express');
var router = express.Router();
var request = require('request');

var apikey = process.env.APIKEY;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

router.get('/corpse', function(req, res, next) {
  res.render('corpse', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

router.get('/portraits', function(req, res, next) {
  var portraits = [
    [291707, 292324, 219609],
    [209314, 209315, 209317, 209273, 208811, 209272, 208810, 208822, 208823, 209328]
  ];

  var currentPortrait = Math.floor(Math.random() * (portraits.length - 0) + 0);
  var currentObjectList = [
  	portraits[currentPortrait][Math.floor(Math.random() * portraits[currentPortrait].length)],
  	portraits[currentPortrait][Math.floor(Math.random() * portraits[currentPortrait].length)],
  	portraits[currentPortrait][Math.floor(Math.random() * portraits[currentPortrait].length)]
  ];
  var imageParts = new Array(3);

  var objectURL = 'http://api.harvardartmuseums.org/object/' + currentObjectList[0];
  request(objectURL, {qs: {apikey: apikey}}, function(error, response, body) {
  	var o = JSON.parse(body);
  	
  	if (!o.error) {
  		imageParts.push()

  	  res.render('portraits', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
  	} else {
  	  res.render('error', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
  	}  
  });
});

router.get('/coins', function(req, res, next) {
  res.render('coins', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

module.exports = router;
