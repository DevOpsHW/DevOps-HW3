var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
// client.set("key", "this message will self-destruct in 10 seconds");


app.use( function (req, res, next) 
{	
	// if( !client.get('queue'))	
	// {
	// 	client.set('queue', [])
	// }
	console.log(req.method, req.url);
	// ... INSERT HERE.
	client.lpush('recent', req.method + ' - ' + req.url + ' - ' + req.protocol);
	client.ltrim('recent', 0, 4);
	client.lrange('recent', 0, 4, function(err, reply){
		console.log(reply);
		// res.send(reply);
	})
	next(); // Passing the request to the next handler in the stack.
});


app.get('/recent', function (req, res){
	client.lrange('recent', 0, 4, function (err, reply){
		res.send(reply.join(',\r\n\n'));
		// for(var i = 0 ; i < reply.length; i++)
		// {
		// 	res.send(reply[i]);
		// }
	})
})

app.get('/set', function (req, res) {
  client.set("key", "this message will self-destruct in 10 seconds");
  
  client.expire("key", 10)
});

app.get('/get', function (req, res){
	var key;
	client.get('key', function (err, reply){
		console.log(reply);
		res.send(reply);
		// key = reply;
		// return reply;
	});
	// console.log(rep);
	// res.send(rep);
});



///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.



app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
   console.log(req.body) // form fields
   console.log(req.files) // form files

   if( req.files.image )
   {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
	  		var img = new Buffer(data).toString('base64');
	  		// console.log(img);
	  		client.lpush('meow', img);
		});
	}

   res.status(204).end()
}]);

app.get('/meow', function(req, res) {
	{
		// 
		res.writeHead(200, {'content-type':'text/html'});
		client.llen('meow', function (err, len){
			console.log(len);
		});
		// console.log(len);
		client.lrange('meow', 0, 10, function(err, reply){
			if (err) throw err
			// console.log(reply);
			reply.forEach(function (imagedata) 
			{
				// console.log(imagedata);
   				res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
   				// res.send("hahahahahah");

			});
			res.end();
		});
		
		client.ltrim('meow', 1, 2);
   		
	}
})

// HTTP SERVER
// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log('Example app listening at http://%s:%s', host, port)
// })

