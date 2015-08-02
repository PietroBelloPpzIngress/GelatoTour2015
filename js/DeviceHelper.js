var wait_istances = 0;
var intervalId;

device_wait_start = function(app) {
	intervalId = setInterval( device_wait, 500, app );
}

device_wait = function(app) {
    
	if (test_PC)
	{	clearInterval(intervalId);
    	app.deviceHelper.init(app);
	}
    else if ( typeof device != 'undefined' ) 
    {   	
		clearInterval(intervalId);
    	app.deviceHelper.init(app);
    } 
    else if (wait_istances<10) 
    {
    	console.log("DeviceHelper.listen UNSUCCESSFUL");
    	wait_istances++;
    }
    else
    {	
    	clearInterval(intervalId);
    	console.log("device not found");

    	//DA REMMARE IN PRODUCTION
    	app.deviceHelper.init(app);
    }
};

var DeviceHelper = function(successCallback, errorCallback) {
	
	var name = "";
	var phonegap = "";
	var platform = "";
	var uuid = "";
	var model = "";
	var version = "";

	var browser = "";
 
	var latitude = "";
	var longitude = "";
	var altitude = "";
	var accuracy = "";
	var altitudeAccuracy = "";
	var heading = "";
	var speed = "";

	this.init = function(app) {

		if (test_PC)
		{	this.name     = "TEST PC";
			this.phonegap = "TEST PC";
			this.platform = "TEST PC";
			this.uuid     = "TEST PC";
			this.model    = "TEST PC";
			this.version  = "TEST PC";
			console.log("TEST PC");
		}
		else
		{
			try
			{	this.name     = device.name;
				this.phonegap = device.phonegap;
				this.platform = device.platform;
				this.uuid     = device.uuid;
				this.model    = device.model;
				this.version  = device.version;
			}
			catch(err)
			{	this.name     = "NOT DEFINED";
				this.phonegap = "NOT DEFINED";
				this.platform = "NOT DEFINED";
				this.uuid     = "NOT DEFINED";
				this.model    = "NOT DEFINED";
				this.version  = "NOT DEFINED";
				console.log("ERRORE DeviceHelper.init() DEVICE : "+err);
			}
		}

		try
		{	this.browser = (function(){
			    var ua= navigator.userAgent, tem, 
			    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
			    if(/trident/i.test(M[1])){
			        tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
			        return 'IE '+(tem[1] || '');
			    }
			    M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
			    if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
			    return M.join(' ');
			})();
		}
		catch(err)
		{	console.log("ERRORE DeviceHelper.init() BROWSER : "+err);
		}

		try
		{	this.getGeolocation();
		}
		catch(err)
		{	console.log("ERRORE DeviceHelper.init() GEOLOCATION : "+err);
		}

		console.log(this.toJSON());
		
		$.mobile.changePage(
		    '#homePage',
		    {   transition: 'fade',
		    }
		);

		//app.dataManager.getRegions( function(regions) { ShowHomeView(); });
		//ShowHomeView();
	}

	this.toArray = function(callback) {
		arrToReturn = { name 	 : this.name,
						phonegap : this.phonegap,
						platform : this.platform,
						uuid     : this.uuid,
						model    : this.model,
						version  : this.version,
						browser  : this.browser
					 } ;
		return arrToReturn;
	}

	this.toJSON = function(callback) {
		strToReturn = JSON.stringify( this.toArray() ); 
		return strToReturn;
	}

	this.getGeolocation = function() {
		var onSuccess = function(position) {
			app.deviceHelper.latitude          = position.coords.latitude;
			app.deviceHelper.longitude         = position.coords.longitude;
			app.deviceHelper.altitude          = position.coords.altitude;
			app.deviceHelper.accuracy          = position.coords.accuracy;
			app.deviceHelper.altitudeAccuracy  = position.coords.altitudeAccuracy;
			app.deviceHelper.heading           = position.coords.heading;
			app.deviceHelper.speed             = position.coords.speed;

			console.log(
				'Latitude: '          + position.coords.latitude          + '\n' +
				'Longitude: '         + position.coords.longitude         + '\n' +
				'Altitude: '          + position.coords.altitude          + '\n' +
				'Accuracy: '          + position.coords.accuracy          + '\n' +
				'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				'Heading: '           + position.coords.heading           + '\n' +
				'Speed: '             + position.coords.speed             + '\n' +
				'Timestamp: '         + position.timestamp                + '\n');
		};

		// onError Callback receives a PositionError object
		//
		function onError(error) {
		    console.log(
				'code: '    + error.code    + '\n' +
				'message: ' + error.message + '\n');
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

}
