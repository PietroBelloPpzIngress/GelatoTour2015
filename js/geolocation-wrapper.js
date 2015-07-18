"use strict";




function geolocationWrapper() {
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    
    var onSuccess = function(position) {
	    runtimePopup('Latitude: '          + position.coords.latitude          + '\n' +
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
	    runtimePopup('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}

	
}