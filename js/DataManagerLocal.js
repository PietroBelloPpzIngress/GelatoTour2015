var DataManagerLocal = function(successCallback, errorCallback) {

	this.db = null;
	this.dbCreated = false;
	this.tipo = "LOCAL";

	this.request_url = "";
	this.request_value = "";

	this.init = function(SQL_init, callback) {

		this.populateDB();
	}

	this.populateDB= function(tx) {
		$.mobile.loading("show");

		console.log("Start init LOCAL DATA");
		
		$("#splash_big_logo").fadeIn(1, "linear", function()
		{  
		    app.dataManagerRemote.getLists(index_regions_list, "http://www.gelatotour.com/api/json/regions/listall.php", function(){

		        app.dataManagerRemote.getLists(index_cities_list, "http://www.gelatotour.com/api/json/zones/listall.php", function(){
		        
		            app.dataManagerRemote.getLists(index_shops_list, "http://www.gelatotour.com/api/json/icecreamshops/listall.php", function(){
		                
                        ShowHomeView();

                    });
	            });
	        });
	    });

		console.log("Finish init LOCAL DATA");
	}

}

DataManagerLocal.SQL_init = "";
