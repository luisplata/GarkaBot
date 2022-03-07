var mysql      	= require('mysql');
var entorno 	= require('../utilitys/config-modules.js').config();
var connection;
var consulta 	= function(consultica,callback, callbackError){
	if(connection == null){
		connection = mysql.createConnection({
			host     : entorno.db.servidor,
			user     : entorno.db.usuario,
			password : entorno.db.password
		});
		connection.connect();
		connection.query('USE '+entorno.db.database);
	}

	connection.query(consultica, function(err, rows, fields) {
	  if (err){
		  callbackError(err);
		  return;
	  }
	  callback(rows);
	});

	connection.end();
	connection = null;
}


module.exports.Consulta = consulta;