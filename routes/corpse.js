var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('corpse', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

router.get('/h', function(req, res, next) {
  res.render('corpse-h', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

module.exports = router;
