var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
});

module.exports = router;
