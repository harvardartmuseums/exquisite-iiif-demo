var socketServer = require('socket.io');
var request = require('request');

var apikey = process.env.APIKEY;
var objectURL = 'http://api.harvardartmuseums.org/object';
var queryString = {
    apikey: apikey, 
    sort: 'random', 
    keyword: 'portrait', 
    classification: 'Paintings', 
    fields: 'title,primaryimageurl,images', 
    gallery: 'any', 
    hasimage: 1, 
    size: 1
  };

var io;

exports.start = function(server) {
  io = new socketServer(server);
  io.on('connection', onSocketConnection);
  startBroadcasting();
} 

function onSocketConnection(socket) {
  console.log('connected');
}

function startBroadcasting() {
  setInterval(function(){
    request(objectURL, {qs: queryString}, function(error, response, body) {
      if (!error) {
        var data = JSON.parse(body);
        
        if (!data.error) {
          if (data.records[0].images.length > 0) {
            // Get the image info
            var imageInfoURL = data.records[0].images[0].iiifbaseuri + '/info.json';
            request(imageInfoURL, function(error, response, body) {
              if (response.statusCode === 200) {
                var imageInfo = JSON.parse(body);

                var r = {
                  id: data.records[0].id,
                  title: data.records[0].title,
                  baseimageurl: data.records[0].images[0].baseimageurl,
                  iiifbaseuri: data.records[0].images[0].iiifbaseuri,
                  imageheight: imageInfo.height,
                  imagewidth: imageInfo.width
                }
                io.emit('new_object', r);
              }
            });
          } else {
            io.emit('error', 'bad object');
          } 
        }
      }
    });
  }, 5000);  
}