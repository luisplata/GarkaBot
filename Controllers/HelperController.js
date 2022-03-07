var logger = require("../utilitys/logs").log();
var entorno 	= require('../utilitys/config-modules.js').help();

var Helper = function(word, callback){
    logger.info(word);
    logger.info(entorno.help);
    var listOfHelp = entorno.help;
    var list= [];
    listOfHelp.forEach(function(value, index, array) {
        list.push({"text":value.text,"callback_data":value.callback_data});
    });
    logger.info(list);
    callback("list of help",{
        "reply_markup":{
            "inline_keyboard":[
                    list
            ]
        }
    });
}

module.exports.Helper = Helper;