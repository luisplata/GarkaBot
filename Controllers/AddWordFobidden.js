var mysql = require("../utilitys/conexion");
var logger = require("../utilitys/logs").log();

var AddWord = function(word, callback){
    console.log("insert into palabras values('"+word+"')");
    try{
        mysql.Consulta("insert into palabras values('"+word+"')",function(req){
            logger.info(req);
            callback("the word '"+word+"' is added");
        },function (err) {
            logger.error(err);
            callback("the word '"+word+"' has already adding");
        });
    }catch (e){
        logger.error(e);
    }

}

module.exports.AddWord = AddWord;