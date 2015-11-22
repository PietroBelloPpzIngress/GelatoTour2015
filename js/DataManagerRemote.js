var DataManagerRemote = function(successCallback, errorCallback) {
	
	this.tipo = "REMOTE";
 
	this.init = function(callback) {
		//sever solo come placeholder in caso inverta DataManagerRemote con DataManagerLocal
	}


	this.getLists = function(index_list, request_url, callback) {
	 	
	 	console.log('GET LIST '+index_list+' start');
	    $.mobile.loading("show");

	    if ( ! localStorage.getItem("app-list_"+index_list))
	    {
		    if (index_list==index_regions_list)
		    	localStorage.setItem("app-list_"+index_list, staticListRegions );
		   	else if (index_list==index_cities_list)
		    	localStorage.setItem("app-list_"+index_list, staticListZones );
		   	else if (index_list==index_shops_list)
		    	localStorage.setItem("app-list_"+index_list, staticListShops );
	    }
		    
	    $.ajax({
	        type: 'GET',
	        url: request_url,
	        dataType: 'JSON',
	        timeout: 50000,
	        cache: false,
	        success: function(data) {

	        	localStorage.setItem("app-list_"+index_list,JSON.stringify(data));

			    //DataManagerRemote.lists[index_list] = localStorage.getItem("app-list_"+index_list);
			    DataManagerRemote.lists[index_list] = data;

	        	$.mobile.loading("hide");

        		console.log('GET LIST '+index_list+' : Ajax success');

	            callback();

	        },
	        error: function(data) {	

	        	$.mobile.loading("hide");

	            console.log('GET LIST '+index_list+' : Ajax error '+JSON.stringify(data));

	            DataManagerRemote.lists[index_list] = JSON.parse(localStorage.getItem("app-list_"+index_list));

	            callback();
	        }
	    });
	}

    this.getCitiesByRegion = function(region_id, region_name, callback, errorCallback) {
	 
		    $.mobile.loading("show");
		     
		    $.ajax({
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        data: { regione	: region_name  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		console.log('DataManagerRemote.getCitiesByRegion '+region_id+'/'+region_name+' : Ajax success '+data.id);
		            callback(data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            console.log('DataManagerRemote.getCitiesByRegion '+region_id+'/'+region_name+' : Ajax error '+JSON.stringify(data));
		            errorCallback();
		        }
		    });
	}


    this.getShopsByCity = function(region_id, region_name, city_id, city_name, callback, errorCallback) {
	    
		    $.mobile.loading("show");
		     
		    $.ajax({
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        data: { regione		: region_name,
		        		provincia	: city_name
		        	  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		console.log('DataManagerRemote.getShopsByCity '+region_id+'/'+region_name+' '+city_id+'/'+city_name+' : Ajax success ');
		            callback(data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            console.log('DataManagerRemote.getShopsByCity '+region_id+'/'+region_name+' '+city_id+'/'+city_name+' : Ajax error '+JSON.stringify(data));
		            errorCallback();
		        }
		    });
	}

    this.getShop = function(shop_id, callback, errorCallback) {

		    $.mobile.loading("show");
		     
		    $.ajax({
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        data: { id_gelateria	: shop_id
		        	  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		console.log('DataManagerRemote.getShop '+shop_id+' : Ajax success '+data[0].id);
		            callback(data[0]);

		            //app.dataManagerLocal.setRequests( '/app-list.php?id_gelateria='+shop_id, data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            errorCallback();
		        }
	    	});

	}

}

DataManagerRemote.updateSQL = [];

DataManagerRemote.lists = [];
DataManagerRemote.lists[0] = new Array();
DataManagerRemote.lists[1] = new Array();
DataManagerRemote.lists[2] = new Array();

DataManagerRemote.regionsShopsCountList = [];