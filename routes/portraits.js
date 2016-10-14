var express = require('express');
var router = express.Router();
var request = require('request');

var apikey = process.env.APIKEY;

router.get('/', function(req, res, next) {
  var portraits = [
    [291707, 292324, 219609],
    [209314, 209315, 209317, 209273, 208811, 209272, 208810, 208822, 208823, 209328],
    [299843, 304344, 297681],
    [230367, 230202, 230340]
  ];

  var currentPortrait = Math.floor(Math.random() * (portraits.length - 0) + 0);
  var currentObjectList = [
  	portraits[currentPortrait][Math.floor(Math.random() * portraits[currentPortrait].length)],
  	portraits[currentPortrait][Math.floor(Math.random() * portraits[currentPortrait].length)],
  	portraits[currentPortrait][Math.floor(Math.random() * portraits[currentPortrait].length)]
  ];
  var imageParts = [];

  // Get part 1
  var objectURL = 'http://api.harvardartmuseums.org/object/' + currentObjectList[0];
  request(objectURL, {qs: {apikey: apikey}}, function(error, response, body) {
  	var o = JSON.parse(body);  	
  	if (!o.error) {
      if (o.images.length > 0) {
        // Get the image info
        var imageInfoURL = o.images[0].iiifbaseuri + '/info.json';
        request(imageInfoURL, function(error, response, body) {
          var imageInfo = JSON.parse(body);
  		  imageParts.push(imageInfo['@id'] + '/0,0,' + imageInfo.width + ',' + Math.floor((imageInfo.height/3)) + '/500,/0/native.jpg');

  		  // Get part 2
		  objectURL = 'http://api.harvardartmuseums.org/object/' + currentObjectList[1];
		  request(objectURL, {qs: {apikey: apikey}}, function(error, response, body) {
		  	o = JSON.parse(body);  	
		  	if (!o.error) {
		      if (o.images.length > 0) {
		        // Get the image info
		        imageInfoURL = o.images[0].iiifbaseuri + '/info.json';
		        request(imageInfoURL, function(error, response, body) {
		          imageInfo = JSON.parse(body);
		  		  imageParts.push(imageInfo['@id'] + '/0,' + Math.floor((imageInfo.height/3)) + ',' + imageInfo.width + ',' + Math.floor((imageInfo.height/3)) + '/500,/0/native.jpg');

		  		  // Get part 3
				  objectURL = 'http://api.harvardartmuseums.org/object/' + currentObjectList[2];
				  request(objectURL, {qs: {apikey: apikey}}, function(error, response, body) {
				  	o = JSON.parse(body);  	
				  	if (!o.error) {
				      if (o.images.length > 0) {
				        // Get the image info
				        imageInfoURL = o.images[0].iiifbaseuri + '/info.json';
				        request(imageInfoURL, function(error, response, body) {
				          imageInfo = JSON.parse(body);
				  		  imageParts.push(imageInfo['@id'] + '/0,' + Math.floor((imageInfo.height/3))*2 + ',' + imageInfo.width + ',' + Math.floor((imageInfo.height/3)) + '/500,/0/native.jpg');

				 	 	  res.render('portraits', { 
				 	 	  	title: 'Exquisite IIIF Demo | Harvard Art Museums',
				 	 	  	image_part_1: imageParts[0],
				 	 	  	image_part_2: imageParts[1],
				 	 	  	image_part_3: imageParts[2]
				 	 	  });
				  		});
				      } else {
				      	// report an error
				      }
				    }
		  		  });
		  		});
		      } else {
		      	// report an error
		      }
		    }
  		  });
       });

     }

  	} else {
  	  res.render('error', { title: 'Exquisite IIIF Demo | Harvard Art Museums' });
  	}  
  });
});

module.exports = router;