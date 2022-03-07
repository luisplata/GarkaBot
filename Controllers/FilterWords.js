var mysql = require("../utilitys/conexion");
var logger = require("../utilitys/logs").log();

var Filter = function(word, callback){
    var splitWord = word.split(' ');
    splitWord.forEach(function(value, index, array){
        mysql.Consulta("select * from palabras p where p.palabra like '"+value+"'",function(req){
            if(req.length > 0){
                logger.warn(word);
                callback("the word '"+word+"' is forbidden");
            }
        },function (err) {
            logger.error(err);
        });
    });
}

module.exports.Filter = Filter;