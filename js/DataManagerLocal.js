var DataManagerLocal = function(successCallback, errorCallback) {

	this.db = null;
	this.dbCreated = false;
	this.tipo = "LOCAL";

	this.request_url = "";
	this.request_value = "";

	this.init = function(SQL_init, callback) {
		//DataManagerLocal.SQL_init = SQL_init;
		//DataManagerLocal.SQL_init = "DROP TABLE api_request;";
		DataManagerLocal.SQL_init = "CREATE TABLE IF NOT EXISTS api_request (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, url VARCHAR(255), value TEXT, last_update VARCHAR(10))";

	    this.db = window.openDatabase("GelatoTour2015", "1.0", "Gelato Tour 2015 Local Database", 1024*1024);

	    if (this.dbCreated)	{
	    	//this.db.transaction(this.getCities, this.transaction_error, callback);
	    }
	    else {
	    	this.db.transaction(this.populateDB, this.transaction_error, this.populateDB_success(callback));
	    }
	}

	this.transaction_error = function(tx, error) {
		$('#busy').hide();
	    //alert("Database Error: " + error);
	}

	this.populateDB_success = function(callback) {
		this.dbCreated = true;
		//callback();
	    //this.db.transaction(this.getCities, this.transaction_error);
	}

	this.populateDB= function(tx) {
		$('#busy').show();

		//alert(DataManagerLocal.SQL_init);

		var length = DataManagerLocal.SQL_init.length;
		var mult = (100/length);

		console.log("Start init DB");

		tx.executeSql( DataManagerLocal.SQL_init );
		/*
		for (var i = 0; i < length ; i++) {
			//console.log(DataManagerLocal.SQL_init[i].replace("\\'",""));
			if ( DataManagerLocal.SQL_init[i]!=null && DataManagerLocal.SQL_init[i]!="") tx.executeSql( DataManagerLocal.SQL_init[i] );

			app.progressBar.setValue('#slider',parseInt(i*mult));
		}
		*/

		console.log("Finish init DB");
	}

	/*
	this.getRequest = function(param_1, param_2, param_3, param_4, url, callback) {
		console.log("DataManagerLocal.getRequest");

		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM api_request WHERE url='"+url+"';";
			console.log(sql);

			tx.executeSql(sql, [], function(tx, results) {
		    	var value = "";
		    	if(results.rows.length>0) 
		    	{
		    		value = results.rows.item(0).value;
		    	}
				callback(param_1, param_2, param_3, param_4, value, callback);
			});
		}, this.transaction_error);
	}
	*/

	this.getRequests = function(param_1, param_2, param_3, param_4, url, callback) {
		console.log("DataManagerLocal.getRequest");

		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM api_request WHERE url='"+url+"';";
			console.log(sql);

			tx.executeSql(sql, [], function(tx, results) {
		    	var values = [];
		    	for(var i=0; i<results.rows.length; i++) {
		    		values.push(results.rows.item(i).value);
		    	}
				callback(param_1, param_2, param_3, param_4, values, callback);
			});
		}, this.transaction_error);
	}

	this.setRequests = function(url, values, tx) {

	    $.mobile.loading("show");

		this.db.transaction( function(tx) {

			var date;
		    date = new Date();
		    date = date.getUTCFullYear() + '-' +
		            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
		            ('00' + date.getUTCDate()).slice(-2);     

		    var sql = "";
		    for(var i=0; i<values.length; i++) {
				sql = "INSERT INTO api_request(url,value,last_update) VALUES('"+url+"','"+(JSON.stringify(values[i]))+"','"+date+"');" ;
				console.log("INSERT "+url);
				console.log("INSERT "+(JSON.stringify(values[i])));
				console.log("");
				console.log("");

				tx.executeSql( sql );
			}

			$.mobile.loading("hide");
		}, console.log(this.transaction_error));
	}

}

DataManagerLocal.SQL_init = "";

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}