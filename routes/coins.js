var express = require('express');
var router = express.Router();
var request = require('request');

var apikey = process.env.APIKEY;
var objectURL = 'http://api.harvardartmuseums.org/object';
var queryString = {
    apikey: apikey, 
    sort: 'random', 
    classification: 'Coins', 
    fields: 'title,primaryimageurl,images', 
    hasimage: 1, 
    size: 2
  };

router.get('/', function(req, res, next) {
	var imageParts = [];

	request(objectURL, {qs: queryString}, function(error, response, body) {
		var data = JSON.parse(body);  	
		if (!data.error) {
			var imageInfoURL = data.records[0].images[0].iiifbaseuri + '/info.json';
	        request(imageInfoURL, function(error, response, body) {
	        	imageInfo = JSON.parse(body);
				imageParts.push(imageInfo['@id'] + '/0,0,' + Math.floor(imageInfo.width/2) + ',' + Math.floor(imageInfo.height/2) + '/full/0/native.jpg');

				imageInfoURL = data.records[1].images[0].iiifbaseuri + '/info.json';
		        request(imageInfoURL, function(error, response, body) {
		        	imageInfo = JSON.parse(body);
					imageParts.push(imageInfo['@id'] + '/0,' + Math.floor(imageInfo.height/2) + ',' + Math.floor(imageInfo.width/2) + ',' + Math.floor(imageInfo.height/2) + '/full/0/native.jpg');
		
					res.render('coins', { 
						title: 'Exquisite IIIF Demo | Harvard Art Museums', 
						image_top: imageParts[0],
						image_bottom: imageParts[1]
					});
				});
			});
		}
	});
});

module.exports = router;
