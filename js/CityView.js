var CityView = function(dataManager) {

	this.id = "";
	this.cityDetails = null;

	this.getCityDetails = function(region_id, region_name, city_id, city_name) {
		$.mobile.loading("show");
	    dataManager.getShopsByCity(region_id, region_name, city_id, city_name, currentCity.renderCityDetails );
	};

	this.getPOIs = function(id) {
	    dataManager.getPOIsByCity(id, currentCity.renderPOIList );
	};
 
    this.renderCityDetails = function(cityDetails) {
    	//$('#poiPage').html = ''; 	// forse è superfluo: aggiunto per rimuovere glitch di impaginazione di header e footer nella poi page

    	currentCity.cityDetails = cityDetails;

    	//$('.header-city-name').html(CityView.headerNameTemplate(cityDetails));
    	//$('.header-city-image').html(CityView.headerImageTemplate(cityDetails));
    	$('.banner_city').attr('src',cityDetails.image_file_name);
    	$('.title_city').html(cityDetails.name);

	    $('.city-details').html(CityView.detailsTemplate(cityDetails));
	    $('.city-map-click').html(CityView.cityMapButtonTemplate(cityDetails));

        $('#cityPage #footer').html(CityView.genericFooter());
        $("#cityPage #footer").trigger("create");

        currentCity.showPage(cityDetails);
	};

	this.renderPOIList = function(cityPOIsList) {
		if (cityPOIsList.length>=1)
		{
	    	$('#city_POIs_list').html(CityView.poiListTemplate(cityPOIsList));
	    	$('#city_POIs_list').listview('refresh');
    	}
    	else
    	{	$('#city_POIs_list').html('');
    		$('#city_POIs_list').listview('refresh');
    	}

    	translate_page();
	};

	this.showPage = function(cityDetails) {
		
	   	if (dataManager.tipo=='REMOTE')	currentCity.renderPOIList(cityDetails);
	
	   	console.log("Rigenera pulsanti");
		$('button').button();

		translate_page();
		
	   	$.mobile.loading("hide");
	};

	this.showMap = function(cityDetails){ 

		var div = $('#map_city_canvas');
		var width = div.width(); 
		div.css('height', width);

		//BuildMap( 50.725,-3.528,50.726,-3.526 );
		BuildMap( cityDetails );

		function BuildMap( cityPOIsList ){

		    var minZoomLevel = 12;

		    var latlng;
		    var latlngbounds = new google.maps.LatLngBounds();
			for (var i = 0; i < cityPOIsList.length; i++) {
				latlng = new google.maps.LatLng(cityPOIsList[i].lat, cityPOIsList[i].lng);
			    latlngbounds.extend(latlng);
			}

		    city_map = new google.maps.Map(document.getElementById('map_city_canvas'), {
		      zoom: minZoomLevel,
		      center: new google.maps.LatLng( cityPOIsList[0].lat, cityPOIsList[0].lng ),
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    });

			city_map.fitBounds(latlngbounds);

		    //var pinImage = new google.maps.MarkerImage("css/images/marker_gtp.png");

		    POI_markers = new Array();
		    contentString  = new Array();
		    for (var i = 0; i < cityPOIsList.length; i++) {
			    
				    POI_markers[i] = new google.maps.Marker({
				      	position: new google.maps.LatLng( cityPOIsList[i].lat, cityPOIsList[i].lng ),
				      	/*icon: pinImage,*/
				      	map: city_map,
	      			  	id: cityPOIsList[i].id
				    });

           		markerClick_POI(POI_markers[i], i, cityPOIsList);
			}
		}
	};
	 
 }

function markerClick_POI(marker, i, cityPOIsList)
{	
	google.maps.event.addListener(marker, 'click', function() {
	    var contentString = '<div>'+
	  						'<a href="" onClick="ShowShop('+cityPOIsList[i].id+')">'+
	      						'<img src="/css/images/info_azzurra.png" style="width:80px;height:80px;">'+
	      						cityPOIsList[i].name+'</a>'+
	  					'</div>';

		if (POI_infowindow) POI_infowindow.close();

		POI_infowindow = new google.maps.InfoWindow({
					      content: contentString 
				  	});

		POI_infowindow.open(city_map,marker);
	});
}

function ShowCity(id,name)
{	
	$('.banner_city').attr('src',"");
	$('.title_city').html("");
	$('#city_POIs_list').html("");

	$.mobile.changePage(
			'#cityPage',
			{   transition: 'fade', 
	            reverse:false
	        }
	    );
	   	
	console.log("ShowCity:"+id);

	CityView.currentCity_id = id;
	CityView.currentCity_name = name;
}

$(document).on("pageshow", "#cityPage", function(event) {
    currentCity = new CityView(app.dataManager);
	currentCity.id = CityView.currentCity_id;
	currentCity.getCityDetails(RegionView.currentRegion_id, RegionView.currentRegion_name,CityView.currentCity_id,CityView.currentCity_name);

	translate();
});

function ShowCityMap(id)
{	
	console.log("ShowCityMap:"+id);

	$.mobile.loading("show");

	$.mobile.changePage(
        '#mapCityPage',
        {   transition: 'fade'
        }
    );
   
   translate_page();
}

var city_map = null;
var POI_markers = null;
var POI_infowindow = null;

CityView.currentCity_id = null;
CityView.currentCity_name = null;
CityView.headerNameTemplate = Handlebars.compile($('#city-header-name-tpl').html());
CityView.headerImageTemplate = Handlebars.compile($('#city-header-image-tpl').html());
CityView.detailsTemplate = Handlebars.compile($('#city-tpl').html());
CityView.poiListTemplate = Handlebars.compile($('#city-poi-li-tpl').html());
CityView.cityMapButtonTemplate = Handlebars.compile($('#city-map-button').html());

CityView.genericFooter = Handlebars.compile($("#generic-footer").html());

