var DataManagerRemote = function(successCallback, errorCallback) {
	
	this.tipo = "REMOTE";
 
	this.init = function(callback) {
		//sever solo come placeholder in caso inverta DataManagerRemote con DataManagerLocal
	}

    this.getUpdateSQL = function(callback) {
	    var bugs = $('#bugs ul');

	    $.mobile.loading("show");
	     
	    $.ajax({
	        type: 'GET',
	        url: base_url+'/jsonp_update_sql',
	        data: { app_name	: app.name,
	        		app_version	: app.version,
	        		user_id: app.userHelper.id,
	        		latitude	: app.deviceHelper.latitude,
	        		longitude	: app.deviceHelper.longitude,
	        		altitude	: app.deviceHelper.altitude,
	        		accuracy	: app.deviceHelper.accuracy,
	        		altitudeAccuracy	: app.deviceHelper.altitudeAccuracy,
	        		heading		: app.deviceHelper.heading, 
	        		speed		: app.deviceHelper.speed  },
	        dataType: 'JSONp',
	        timeout: 50000,
	        success: function(data) {

	        	$.mobile.loading("hide");

				DataManagerRemote.updateSQL = [];

           		$.each(data, function(i,item){
	                DataManagerRemote.updateSQL.push(item);
	                //console.log(item);
	            });
        		console.log('DataManagerRemote.getUpdateSQL : Ajax success '+DataManagerRemote.updateSQL.length);
	            callback(DataManagerRemote.updateSQL);
	        },
	        error: function(data) {	

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getUpdateSQL : Ajax error '+JSON.stringify(data));
	            //errorCallback();
	        }
	    });
	}

    this.getRegions = function(callback) {
	    var bugs = $('#bugs ul');

	    $.mobile.loading("show");
	     
	    $.ajax({
	        type: 'GET',
	        url: base_url+'/app-list.php',
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
	    // LOOK FOR CACHED CUTY
	    console.log("LOOK FOR CACHED REGION");
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
        {	console.log("CACHED REGION FOUND");
        	return;
        }
*/
	    // CACHED CITY NOT FOUND : I RETRIEVE IT
	    console.log("CACHED REGION NOT FOUND");

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

        		DataManagerRemote.currentRegion = data;
        		console.log('DataManagerRemote.getCitiesByRegion '+region_id+'/'+region_name+' : Ajax success '+DataManagerRemote.currentRegion.id);
	            callback(DataManagerRemote.currentRegion);
	        },
	        error: function(data) {	

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getCitiesByRegion '+region_id+'/'+region_name+' : Ajax error '+JSON.stringify(data));
	            //errorCallback();
	        }
	    });
	}

    this.getShopsByCity = function(region_id, region_name, city_id, city_name, callback) {
	    var bugs = $('#bugs ul');
/*
	    // LOOK FOR CACHED CUTY
	    console.log("LOOK FOR CACHED REGION");
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
        {	console.log("CACHED CITY FOUND");
        	return;
        }
*/
	    // CACHED CITY NOT FOUND : I RETRIEVE IT
	    console.log("CACHED CITY NOT FOUND");

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

        		DataManagerRemote.currentCity = data;
        		console.log('DataManagerRemote.getShopsByCity '+region_id+'/'+region_name+' '+city_id+'/'+city_name+' : Ajax success '+DataManagerRemote.currentCity.id);
	            callback(DataManagerRemote.currentCity);
	        },
	        error: function(data) {	

	        	$.mobile.loading("hide");

	            runtimePopup(translate("CONNECTION_ERROR"));

	            console.log('DataManagerRemote.getShopsByCity '+region_id+'/'+region_name+' '+city_id+'/'+city_name+' : Ajax error '+JSON.stringify(data));
	            //errorCallback();
	        }
	    });
	}

    this.getShop = function(shop_id, callback) {
	    var bugs = $('#bugs ul');
/*
	    // LOOK FOR CACHED CUTY
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
	        type: 'GET',
	        url: base_url+'/app-list.php',
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
	    // LOOK FOR CACHED CUTY
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
	        type: 'GET',
	        url: base_url+'/app-galleryList.php?id_gelateria='+shop_id+'&size=1400',
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