var DataManagerRemote = function(successCallback, errorCallback) {
	
	this.tipo = "REMOTE";
 
	this.init = function(callback) {
		//sever solo come placeholder in caso inverta DataManagerRemote con DataManagerLocal
	}

    this.getRegions = function(callback) {
	    var bugs = $('#bugs ul');

	    console.log("LOOK FOR REGIONS LIST");
	    var request_url = '/app-list.php';
	    var parameters = [];
	    app.dataManagerLocal.getRequests( parameters, request_url, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED REGIONS LIST *FOUND*");
	        	console.log(values[0]);
	        	DataManagerRemote.regionsList = JSON.parse(values[0]);
	        	callback(DataManagerRemote.regionsList);
	        	return;
	        }

		    console.log("CACHED REGIONS LIST NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
	            cache: true,
		        type: 'GET',
		        url: base_url+'/app-list.php',
			    headers : { "cache-control": "max-age=86400" },
		        data: {   },
		        dataType: 'JSON',
		        timeout: 50000,
		        success: function(data) {

		        	$.mobile.loading("hide");

					DataManagerRemote.regionsList = [];

	           		$.each(data, function(i,item){
		                DataManagerRemote.regionsList.push(item);
		            });
	        		console.log('DataManagerRemote.getRegions : Ajax success '+DataManagerRemote.regionsList.length);
		            callback(DataManagerRemote.regionsList);

		            app.dataManagerLocal.setRequests( '/app-list.php', data);
		        },
		        error: function(data) {		

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getRegions : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });

		});
	}

    this.getCitiesByRegion = function(region_id, region_name, callback) {
	    var bugs = $('#bugs ul');

	    var param_3 = "";
	    var param_4 = "";

	    console.log("LOOK FOR CACHED REGION");
	    var request_url = '/app-list.php?regione='+region_name;
	    var parameters = [];
	    parameters[0] = region_id;
	    parameters[1] = region_name;
	    app.dataManagerLocal.getRequests( parameters, request_url, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED REGION *FOUND*");
	        	console.log(values[0]);
	        	DataManagerRemote.currentRegion = JSON.parse(values[0]);
	        	callback(DataManagerRemote.currentRegion);
	        	return;
	        }

		    console.log("CACHED REGION NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
            	cache: true,
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        headers : { "cache-control": "max-age=86400" },
		        data: { regione	: parameters[1]  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.currentRegion = data;
	        		console.log('DataManagerRemote.getCitiesByRegion '+parameters[0]+'/'+parameters[1]+' : Ajax success '+DataManagerRemote.currentRegion.id);
		            callback(DataManagerRemote.currentRegion);

		            app.dataManagerLocal.setRequests( '/app-list.php?regione='+parameters[1], data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getCitiesByRegion '+parameters[0]+'/'+parameters[1]+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });

		});
	}

    this.getShopsByCity = function(region_id, region_name, city_id, city_name, callback) {
	    var bugs = $('#bugs ul');

	    console.log("LOOK FOR CACHED CITY");
	    var request_url = '/app-list.php?regione='+region_name+'&provincia='+city_name;
	    var parameters = [];
	    parameters[0] = region_id;
	    parameters[1] = region_name;
	    parameters[2] = city_id;
	    parameters[3] = city_name;
	    app.dataManagerLocal.getRequests( parameters, request_url, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED CITY *FOUND*");
	        	console.log(values);
	        	DataManagerRemote.currentCity = JSON.parse(values);
	        	callback(DataManagerRemote.currentCity);
	        	return;
	        }

		    console.log("CACHED CITY NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
            	cache: true,
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        headers : { "cache-control": "max-age=86400" },
		        data: { regione		: parameters[1],
		        		provincia	: parameters[3]
		        	  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.currentCity = data;
	        		console.log('DataManagerRemote.getShopsByCity '+parameters[0]+'/'+parameters[1]+' '+parameters[2]+'/'+parameters[3]+' : Ajax success '+DataManagerRemote.currentCity.id);
		            callback(DataManagerRemote.currentCity);

		            app.dataManagerLocal.setRequests( '/app-list.php?regione='+parameters[1]+'&provincia='+parameters[3], data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getShopsByCity '+parameters[0]+'/'+parameters[1]+' '+parameters[2]+'/'+parameters[3]+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });

		});
	}

    this.getShop = function(shop_id, callback) {
	    var bugs = $('#bugs ul');

	    console.log("LOOK FOR CACHED SHOP");
	    var request_url = '/app-list.php?id_gelateria='+shop_id;
	    var parameters = [];
	    parameters[0] = shop_id;
	    app.dataManagerLocal.getRequests( parameters, request_url, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED SHOP *FOUND*");
	        	console.log(values);
	        	DataManagerRemote.currentShop = JSON.parse(values);
	        	callback(DataManagerRemote.currentShop);
	        	return;
	        }
	        
		    console.log("CACHED SHOP NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
	            cache: true,
		        type: 'GET',
		        url: base_url+'/app-list.php',
			    headers : { "cache-control": "max-age=86400" },
		        data: { id_gelateria	: parameters[0]
		        	  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.currentShop = data[0];

	        		console.log('DataManagerRemote.getShop '+parameters[0]+' : Ajax success '+DataManagerRemote.currentShop.id);
		            callback(DataManagerRemote.currentShop);

		            app.dataManagerLocal.setRequests( '/app-list.php?id_gelateria='+parameters[0], data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getShop '+parameters[0]+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
	    	});
	    });
	}

	this.getGallery = function(shop_id, callback) {
	    var bugs = $('#bugs ul');

	    console.log("LOOK FOR CACHED GALLERY");
	    var request_url = '/app-galleryList.php?id_gelateria='+shop_id+'&size=1400';
	    var parameters = [];
	    parameters[0] = shop_id;
	    app.dataManagerLocal.getRequests( parameters, request_url, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED GALLERY *FOUND*");
	        	console.log(values);
	        	DataManagerRemote.currentGallery = JSON.parse(values);
	        	callback(DataManagerRemote.currentGallery);
	        	return;
	        }
	        
		    console.log("CACHED GALLERY NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
	            cache: true,
		        type: 'GET',
		        url: base_url+'/app-galleryList.php?id_gelateria='+parameters[0]+'&size=1400',
			    headers : { "cache-control": "max-age=86400" },
		        /*data: { id_gelateria	: parameters[0],
		        		size			: 1400
		        	  },*/
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.currentGallery = data;

	        		console.log('DataManagerRemote.getGallery '+parameters[0]+' : Ajax success '+DataManagerRemote.currentGallery);
		            callback(DataManagerRemote.currentGallery);

		            app.dataManagerLocal.setRequests( '/app-galleryList.php?id_gelateria='+parameters[0]+'&size=1400', data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            //runtimePopup(translate("CONNECTION_ERROR"));
		            DataManagerRemote.currentGallery = [];
		            callback(DataManagerRemote.currentGallery);

		            console.log('DataManagerRemote.getGallery '+parameters[0]+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });
		});
	}

	
	this.getLists = function(index, request_url, callback) {
	    var bugs = $('#bugs ul');

	    console.log("LOOK FOR LIST "+url);
	    var parameters = [];
	    parameters[0] = index;
	    parameters[1] = request_url;
	    app.dataManagerLocal.getRequests( parameters, request_url, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED LIST "+url+" *FOUND*");
	        	console.log(values);
	        	DataManagerRemote.currentGallery = JSON.parse(values);
	        	callback(DataManagerRemote.currentGallery);
	        	return;
	        }
	        
		    console.log("CACHED LIST "+url+" NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
	            cache: true,
		        type: 'GET',
		        url: parameters[0],
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.lists[parameters[0]] = data;

	        		console.log('DataManagerRemote.getLists '+parameters[1]+' : Ajax success ');
		            callback(DataManagerRemote.currentGallery);

		            app.dataManagerLocal.setRequests( parameters[1], data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getLists '+parameters[0]+' : Ajax error ');
		            //errorCallback();
		        }
		    });
		});
	}

}

DataManagerRemote.updateSQL = [];

DataManagerRemote.lists = [];

DataManagerRemote.regionsList = [];
DataManagerRemote.regionsShopsCountList = [];
DataManagerRemote.citiesList = [];
DataManagerRemote.currentRegion = null;
DataManagerRemote.currentCity = null;
DataManagerRemote.currentShop = null;
DataManagerRemote.currentGallery = null;