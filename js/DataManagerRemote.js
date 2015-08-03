var DataManagerRemote = function(successCallback, errorCallback) {
	
	this.tipo = "REMOTE";
 
	this.init = function(callback) {
		//sever solo come placeholder in caso inverta DataManagerRemote con DataManagerLocal
	}

	/*
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
	        	callback(JSON.parse(values[0]));
	        	return;
	        }

		    console.log("CACHED REGIONS LIST NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
		        type: 'GET',
		        url: base_url+'/app-list.php',
			    headers : { "cache-control": "max-age=86400" },
		        data: {   },
		        dataType: 'JSON',
		        timeout: 50000,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		console.log('DataManagerRemote.getRegions : Ajax success '+data.length);
		            callback(data);

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
	        	callback(JSON.parse(values[0]));
	        	return;
	        }

		    console.log("CACHED REGION NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
		        type: 'GET',
		        url: base_url+'/app-list.php',
		        headers : { "cache-control": "max-age=86400" },
		        data: { regione	: parameters[1]  },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		console.log('DataManagerRemote.getCitiesByRegion '+parameters[0]+'/'+parameters[1]+' : Ajax success '+data.id);
		            callback(data);

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

	        if (false)
	        {
	        	console.log("CACHED CITY *FOUND*");
	        	console.log(values);
	        	callback(JSON.parse(values));
	        	return;
	        }

		    console.log("CACHED CITY NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
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

	        		console.log('DataManagerRemote.getShopsByCity '+parameters[0]+'/'+parameters[1]+' '+parameters[2]+'/'+parameters[3]+' : Ajax success ');
		            callback(data);

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
	        	callback(JSON.parse(values));
	        	return;
	        }
	        
		    console.log("CACHED SHOP NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
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

	        		console.log('DataManagerRemote.getShop '+parameters[0]+' : Ajax success '+data[0].id);
		            callback(data[0]);

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
	        	callback(JSON.parse(values));
	        	return;
	        }
	        
		    console.log("CACHED GALLERY NOT FOUND");

		    $.mobile.loading("show");
		     
		    $.ajax({
		        type: 'GET',
		        url: base_url+'/app-galleryList.php?id_gelateria='+parameters[0]+'&size=1400',
			    headers : { "cache-control": "max-age=86400" },
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

	        		console.log('DataManagerRemote.getGallery '+parameters[0]+' : Ajax success ');
		            callback(data);

		            app.dataManagerLocal.setRequests( '/app-galleryList.php?id_gelateria='+parameters[0]+'&size=1400', data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            //runtimePopup(translate("CONNECTION_ERROR"));
		            var emptyGallery = [];
		            callback(emptyGallery);

		            console.log('DataManagerRemote.getGallery '+parameters[0]+' : Ajax error '+JSON.stringify(data));
		            //errorCallback();
		        }
		    });
		});
	}
	*/

	this.getLists_FILE = function(index_list, request_url, callback) {
		var returnSuccess='success';
		var localFileName='';
	    if (index_list==0)
	    	localFileName = "region.json";
	   	else if (index_list==1)
	    	localFileName = "zone.json";
	   	else if (index_list==2)
	    	localFileName = "shop.json";
		var downloadUrl=request_url;
		var base='www/xml/';
		var success = function(result) { 
		            console.log("SUCCESS: \r\n"+result );    
		        };

		var error = function(error) { 
		                  console.error("ERROR: \r\n"+error ); 
		            };
		DataManagerRemote.lists[index_list] = JSON.parse(FilePlugin.callNativeFunction( success, error,{'result':returnSuccess,'file':localFileName,'downloadurl':SettingsDownloadUrl,'base_path':base} )); 
	}	


	this.getLists = function(index_list, request_url, callback) {

	    if (index_list==0)
	    	DataManagerRemote.lists[index_list] = JSON.parse(staticListRegions);
	   	else if (index_list==1)
	    	DataManagerRemote.lists[index_list] = JSON.parse(staticListZones);
	   	else if (index_list==2)
	    {	
	    	for(var i=0; i<staticListShops.length; i++) {
	    		DataManagerRemote.lists[index_list].push(JSON.parse(staticListShops[i]));
	    	}

	    }

	    callback();
 
	}	
	
	this.getLists_DYNAMIC = function(index_list, request_url, callback) {

		$.mobile.loading("show");

	    console.log("LOOK FOR LIST "+request_url);
	    var parameters = [];
	    parameters[0] = index_list;
	    parameters[1] = request_url;

	    var entity = "";
        if (parameters[0]==0)
        	entity = "region";
       	else if (parameters[0]==1)
        	entity = "zone";
       	else if (parameters[0]==2)
        	entity = "shop";

	    app.dataManagerLocal.getRequests( parameters, entity, function(parameters, values){

	        if (values.length>0)
	        {
	        	console.log("CACHED LIST "+parameters[1]+" *FOUND*");
	        	console.log(values);
	        	for(var i=0; i<values.length; i++) {
	        		DataManagerRemote.lists[parameters[0]].push(JSON.parse(values[i]));
	        	}

		        $.mobile.loading("hide");

	        	callback();
	        	return;
	        }
	        
		    console.log("CACHED LIST "+parameters[1]+" NOT FOUND");

		     
		    $.ajax({
		        type: 'GET',
		        url: parameters[1],
		        dataType: 'JSON',
		        timeout: 50000,
		        cache: false,
		        success: function(data) {

		        	$.mobile.loading("hide");

for(var i=0; i<data.length; i++) {
	//delete data[i].description;
	//delete data[i].slogan;
	//delete data[i].master;
	//delete data[i].phone;
	//delete data[i].website;
	//delete data[i].email;
	delete data[i].staff;
	delete data[i].opening_hours;
	delete data[i].specialities;
	//delete data[i].lat;
	//delete data[i].lng;
	delete data[i].show_details;
	delete data[i].created_at;
	delete data[i].updated_at;
	delete data[i].gallery;
	delete data[i].services;
}

console.log(JSON.stringify(data));


	        		DataManagerRemote.lists[parameters[0]] = data;

	        		console.log('DataManagerRemote.getLists '+parameters[1]+' : Ajax success '+data.length);
		            callback();

		            //app.dataManagerLocal.setRequests( parameters[1], data);

		            if (parameters[0]==0)
		            	app.dataManagerLocal.setRequestsMultiple("region",data);
		           	else if (parameters[0]==1)
		            	app.dataManagerLocal.setRequestsMultiple("zone",data);
		           	else if (parameters[0]==2)
		            	app.dataManagerLocal.setRequestsMultiple("shop",data);

		            if (values.length>0)
		            	alert("aggiornamento "+parameters[0]);
		            	
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            //runtimePopup(translate("CONNECTION_ERROR getLists"));

	        		DataManagerRemote.lists[parameters[0]] = values;

		            if (values.length==0)
		            	if (parameters[0]==0)
		            		alert("Aprire l'applicazione con internet attivo ");

		            console.log('DataManagerRemote.getLists '+parameters[0]+' : Ajax error ');
		            //errorCallback();
		        }
		    });
		});
	}


    this.getShop = function(shop_id, callback, errorCallback) {

		    $.mobile.loading("show");
		     
		    $.ajax({
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

	        		console.log('DataManagerRemote.getShop '+shop_id+' : Ajax success '+data[0].id);
		            callback(data[0]);

		            app.dataManagerLocal.setRequests( '/app-list.php?id_gelateria='+shop_id, data);
		        },
		        error: function(data) {	

		        	$.mobile.loading("hide");

		            console.log('DataManagerRemote.getShop '+shop_id+' : Ajax error '+JSON.stringify(data));
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