var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  var coins = [195903]
  var imageLeftURL = 'http://ids.lib.harvard.edu/ids/iiif/20411130/0,0,1240,1174/full/0/native.jpg';

  res.render('coins', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

module.exports = router;
