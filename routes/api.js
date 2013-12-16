/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*'
  });
  res.json({
  	name: 'Sean'
  });
};