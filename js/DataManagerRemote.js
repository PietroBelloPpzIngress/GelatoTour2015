var DataManagerRemote = function(successCallback, errorCallback) {
	
	this.tipo = "REMOTE";
 
	this.init = function(callback) {
		//sever solo come placeholder in caso inverta DataManagerRemote con DataManagerLocal
	}

    this.getRegions = function(callback) {
	    var bugs = $('#bugs ul');

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
	        },
	        error: function(data) {		

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getRegions : Ajax error '+JSON.stringify(data));
	            //errorCallback();
	        }
	    });
	}

	/*
    this.getRegionsShopsCount = function(callback) {
	    var bugs = $('#bugs ul');

	    $.mobile.loading("show");
	     
	    $.ajax({
	        type: 'GET',
	        url: base_url+'/app-conteggioGelaterie.php',
	        data: {   },
	        dataType: 'JSON',
	        timeout: 50000,
	        success: function(data) {

	        	$.mobile.loading("hide");

				DataManagerRemote.regionsShopsCountList = [];

           		$.each(data, function(i,item){
	                DataManagerRemote.regionsShopsCountList.push(item);
	            });
        		console.log('DataManagerRemote.getRegions : Ajax success '+DataManagerRemote.regionsShopsCountList.length);
	            callback(DataManagerRemote.regionsShopsCountList);
	        },
	        error: function(data) {		

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getRegions : Ajax error '+JSON.stringify(data));
	            errorCallback();
	        }
	    });
	}
	*/

    this.getCitiesByRegion = function(region_id, region_name, callback) {
	    var bugs = $('#bugs ul');
/*
	    var param_3 = "";
	    var param_4 = "";

	    // LOOK FOR CACHED REGION
	    console.log("LOOK FOR CACHED REGION");
	    var request_url = '/app-list.php?regione='+region_name;
	    app.dataManagerLocal.getRequests( region_id, region_name, param_3, param_4, request_url, function(region_id, region_name, param_3, param_4, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED REGION *FOUND*");
	        	console.log(values[0]);
	        	DataManagerRemote.currentRegion = JSON.parse(values[0]);
	        	callback(DataManagerRemote.currentRegion);
	        	return;
	        }
*/
		    console.log("CACHED REGION NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
            	cache: true,
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        headers : { "cache-control": "max-age=86400" },
		        data: { regione	: region_name  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.currentRegion = data;
	        		console.log('DataManagerRemote.getCitiesByRegion '+region_id+'/'+region_name+' : Ajax success '+DataManagerRemote.currentRegion.id);
		            callback(DataManagerRemote.currentRegion);

		            app.dataManagerLocal.setRequests( '/app-list.php?regione='+region_name, data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getCitiesByRegion '+region_id+'/'+region_name+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });

//		});
	}

    this.getShopsByCity = function(region_id, region_name, city_id, city_name, callback) {
	    var bugs = $('#bugs ul');

	    // LOOK FOR CACHED REGION
	    console.log("LOOK FOR CACHED CITY");
	    var request_url = '/app-list.php?regione='+region_name+'&provincia='+city_name;
	    app.dataManagerLocal.getRequests( region_id, region_name, city_id, city_name, request_url, function(region_id, region_name, city_id, city_name, values){

	    	
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
		        data: { regione		: region_name,
		        		provincia	: city_name
		        	  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		DataManagerRemote.currentCity = data;
	        		console.log('DataManagerRemote.getShopsByCity '+region_id+'/'+region_name+' '+city_id+'/'+city_name+' : Ajax success '+DataManagerRemote.currentCity.id);
		            callback(DataManagerRemote.currentCity);

		            app.dataManagerLocal.setRequests( '/app-list.php?regione='+region_name+'&provincia='+city_name, data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            runtimePopup(translate("CONNECTION_ERROR"));

		            console.log('DataManagerRemote.getShopsByCity '+region_id+'/'+region_name+' '+city_id+'/'+city_name+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });

		});
	}

    this.getShop = function(shop_id, callback) {
	    var bugs = $('#bugs ul');
/*
	    // LOOK FOR CACHED CITY
	    console.log("LOOK FOR CACHED SHOP");
	    DataManagerRemote.currentRegion = null;
	    $.each(DataManagerRemote.regionsList, function(i,item){
            if (item.id==region_id)
            {	
            	DataManagerRemote.currentRegion = item;
            	callback(DataManagerRemote.currentRegion);
            	return;
            }
        });

        if (DataManagerRemote.currentRegion!=null)
        {	console.log("CACHED SHOP FOUND");
        	return;
        }
*/
	    // CACHED SHOP NOT FOUND : I RETRIEVE IT
	    console.log("CACHED SHOP NOT FOUND");

	    $.mobile.loading("show");
	     
	    $.ajax({
            cache: true,
	        type: 'GET',
	        url: base_url+'/app-list.php',
		    headers : { "cache-control": "max-age=86400" },
	        data: { id_gelateria	: shop_id
	        	  },
	        dataType: 'JSON',
	        timeout: 50000,
	        cache: false,
	        success: function(data) {

	        	$.mobile.loading("hide");

        		DataManagerRemote.currentShop = data[0];

        		console.log('DataManagerRemote.getShop '+shop_id+' : Ajax success '+DataManagerRemote.currentShop.id);
	            callback(DataManagerRemote.currentShop);
	        },
	        error: function(data) {	

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getShop '+shop_id+' : Ajax error '+JSON.stringify(data));
	            //errorCallback();
	        }
	    });
	}

	this.getGallery = function(shop_id, callback) {
	    var bugs = $('#bugs ul');
/*
	    // LOOK FOR CACHED CITY
	    console.log("LOOK FOR CACHED GALLERY");
	    DataManagerRemote.currentRegion = null;
	    $.each(DataManagerRemote.regionsList, function(i,item){
            if (item.id==region_id)
            {	
            	DataManagerRemote.currentRegion = item;
            	callback(DataManagerRemote.currentRegion);
            	return;
            }
        });

        if (DataManagerRemote.currentRegion!=null)
        {	console.log("CACHED GALLERY FOUND");
        	return;
        }
*/
	    // CACHED GALLERY NOT FOUND : I RETRIEVE IT
	    console.log("CACHED GALLERY NOT FOUND");

	    $.mobile.loading("show");
	     
	    $.ajax({
            cache: true,
	        type: 'GET',
	        url: base_url+'/app-galleryList.php?id_gelateria='+shop_id+'&size=1400',
		    headers : { "cache-control": "max-age=86400" },
	        /*data: { id_gelateria	: shop_id,
	        		size			: 1400
	        	  },*/
	        dataType: 'JSON',
	        timeout: 50000,
	        cache: false,
	        success: function(data) {

	        	$.mobile.loading("hide");

        		DataManagerRemote.currentGallery = data;

        		console.log('DataManagerRemote.getGallery '+shop_id+' : Ajax success '+DataManagerRemote.currentGallery);
	            callback(DataManagerRemote.currentGallery);
	        },
	        error: function(data) {	

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getGallery '+shop_id+' : Ajax error '+JSON.stringify(data));
	            //errorCallback();
	        }
	    });
	}



}

DataManagerRemote.updateSQL = [];

DataManagerRemote.regionsList = [];
DataManagerRemote.regionsShopsCountList = [];
DataManagerRemote.citiesList = [];
DataManagerRemote.currentRegion = null;
DataManagerRemote.currentCity = null;
DataManagerRemote.currentShop = null;
DataManagerRemote.currentGallery = null;