var DataManagerLocal = function(successCallback, errorCallback) {

	this.db = null;
	this.dbCreated = false;
	this.tipo = "LOCAL";

	this.init = function(SQL_init, callback) {
		//DataManagerLocal.SQL_init = SQL_init;
		//DataManagerLocal.SQL_init = "DROP TABLE purchases;";
		DataManagerLocal.SQL_init = "CREATE TABLE IF NOT EXISTS purchases (IAP VARCHAR(50) PRIMARY KEY)";

	    this.db = window.openDatabase("GrandTourProjectDB", "1.2", "GrandTourProject Local Database", 1024*1024);

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

	this.getCities = function(callback) {
		console.log("DataManagerLocal.getCities");

		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM city JOIN city_language ON city.id=city_language.city_id AND language='Italiano' ORDER BY created_at DESC";
			//console.log(sql);

			tx.executeSql(sql, [], function(tx, results) {
		    	var cities = [];
		    	for(var i=0; i<results.rows.length; i++) {
		    		cities.push(results.rows.item(i));
		    	}
				callback(cities);
			});
		}, this.transaction_error);
	}

	this.getCity = function(id, callback) {
		this.db.transaction( function(tx) {
			var sql = "SELECT * FROM city JOIN city_language ON city.id=city_language.city_id AND language='Italiano' WHERE city.id='"+id+"'";
			//console.log(sql);

			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows.item(0));
			}); 
		}, this.transaction_error);
	}

	this.getPOIsByCity = function(city_id, callback) {
		this.db.transaction( function(tx) {
			var sql = "SELECT * FROM point_of_interest JOIN point_of_interest_language ON point_of_interest.id=point_of_interest_language.point_of_interest_id AND language='Italiano' WHERE city_id='"+city_id+"' ORDER BY name ASC";
			//console.log(sql);

			tx.executeSql(sql, [], function(tx, results) {
			    var POIs = [];
			    for(var i=0; i<results.rows.length; i++) {
		        	POIs.push(results.rows.item(i));
		    	}
				callback(POIs);
			});
		}, this.transaction_error);
	}

	this.getPOI = function(id, callback) {
		this.db.transaction( function(tx) {
			var sql = "SELECT * FROM point_of_interest JOIN point_of_interest_language ON point_of_interest.id=point_of_interest_language.point_of_interest_id AND language='Italiano' WHERE point_of_interest.id='"+id+"'";
			console.log(sql);

			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows.item(0));
			}); 
		}, this.transaction_error);
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

	

}

DataManagerLocal.SQL_init = "asd";
