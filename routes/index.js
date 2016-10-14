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

router.get('/coins', function(req, res, next) {
  var coins = [195903]
  var imageLeftURL = 'http://ids.lib.harvard.edu/ids/iiif/20411130/0,0,1240,1174/full/0/native.jpg';

  res.render('coins', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

module.exports = router;
