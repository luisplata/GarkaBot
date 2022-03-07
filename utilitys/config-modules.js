const envJSON = require("../env.variables.json");
exports.config = function() {
   var envJSON = require('../env.variables.json');
   var node_env = process.env.NODE_ENV || 'development';
   return envJSON[node_env];
 }

exports.help = function() {
    var envJSON = require('../helper.json');
    return envJSON;
}