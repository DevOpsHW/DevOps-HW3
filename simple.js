// 'use strict';

// var redis = require('redis'),
//     client = redis.createClient();

// client.on('error', function (err) {
//     console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
// });

// client.set('string key', 'string val', redis.print);
// client.hset('hash key', 'hashtest 1', 'some value', redis.print);
// client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);
// client.hkeys('hash key', function (err, replies) {
//     if (err) {
//         return console.error('error response - ' + err);
//     }

//     console.log(replies.length + ' replies:');
//     replies.forEach(function (reply, i) {
//         console.log('    ' + i + ': ' + reply);
//     });
// });

// client.quit(function (err, res) {
//     console.log('Exiting from quit command.');
// });

var redis = require('redis')
var client = redis.createClient(6379, '127.0.0.1', {})
client.set("key", "value");
client.get("key", function(err,value){ console.log(value)});