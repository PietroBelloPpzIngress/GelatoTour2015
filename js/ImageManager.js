var ImageManager = function(successCallback, errorCallback) {

	this.downloadCompleteCallback = "";
	this.downloadCounter = 0;
	this.downloadTarget = 0;

	this.updateImages_cities = function(cities, callback) {
		console.log("ImageManager.updateImages_cities");

		this.downloadCompleteCallback = callback;
		this.downloadTarget = cities.length

		var length = this.downloadTarget;
		var mult = (100/length);

		console.log("Start update IMAGES cities");

		for (var i = 0; i < length ; i++) {
			if ( cities[i].thumbnail_file_name!="" )	{
				//console.log(cities[i].thumbnail_file_name);
				
				//this.downloadFile(encodeURI(base_url+"/images_cities/"+cities[i].thumbnail_file_name), 
				//							"/images_cities/"+cities[i].thumbnail_file_name, 
				//							function(){this.downloadCounter++;} );
			}
			else {
				this.downloadCounter++;
			}

			app.progressBar.setValue('#slider',parseInt(i*mult));
		}

		console.log("Finish update IMAGES cities");
	}

	this.updateImages_POIs = function(POIs, callback) {	

	}

	this.downloadFile = function(uri, filePath, callback) {	
		var fileTransfer = new FileTransfer();
		//var uri = encodeURI("http://some.server.com/download.php");

		console.log(uri);
		console.log(filePath);

		fileTransfer.download(
		    uri,
		    filePath,
		    function(entry) {
		        console.log("download complete: " + entry.fullPath);
		        callback();
		    },
		    function(error) {
		        console.log("download error source " + error.source);
		        console.log("download error target " + error.target);
		        console.log("upload error code" + error.code);
		        callback();
		    }
		);
	}

	this.downloadComplete = function() { 
	}

}

