require('babel-register')
var config = require('./src/constants/config');
require('./src/server/system').startServer(config)
