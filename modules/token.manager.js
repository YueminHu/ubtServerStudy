var redisClient = require('./redis.js').redisClient;
var log   = require('./log.js')();

var TOKEN_EXPIRATION = 60 * 60 * 24 * 7;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60 ;

// Middleware for token verification
exports.verifyToken = function (req, res, next) {
	var token = getToken(req.headers);

	redisClient.get(token, function (err, reply) {
		if (err) {
			log.error(err);
			return res.send(500);
		}
		if (!reply) {
			res.send(401);
		}
		else {
			next();
		}

	});
};

exports.expireToken = function(headers) {
	var token = getToken(headers);
	
	if (token != null) {
		redisClient.set(token, { is_expired: true });
    	redisClient.expire(token, TOKEN_EXPIRATION_SEC);
	}
};

var getToken = function(headers) {
	if (headers && headers.authorization) {
		var authorization = headers.authorization;
		var part = authorization.split(' ');

		if (part.length == 2) {
			var token = part[1];

			return part[1];
		}
		else {
			return null;
		}
	}
	else {
		return null;
	}
};

/*
function runSample() {
    // Set a value with an expiration
    redisClient.set('string key', 'Hello World');
    // Expire in 3 seconds
    redisClient.expire('string key', 3);
 
    // This timer is only to demo the TTL
    // Runs every second until the timeout
    // occurs on the value
    var myTimer = setInterval(function() {
        redisClient.get('string key', function (err, reply) {
            if(reply) {
                console.log('I live: ' + reply.toString());
            } else {
                clearTimeout(myTimer);
                console.log('I expired');
                redisClient.quit();
            }
        });
    }, 1000);
}
*/

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;