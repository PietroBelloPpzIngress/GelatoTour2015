var CityView = function(dataManager) {

	this.id = "";
	this.cityDetails = null;

	this.getCityDetails = function(region_id, region_name, city_id, city_name) {
		$.mobile.loading("show");
	    dataManager.getShopsByCity(region_id, region_name, city_id, city_name, currentCity.renderCityDetails );
	};

	this.getPOIs = function(id) {
	    dataManager.getPOIsByCity(id, currentCity.renderShopsList );
	};
 
    this.renderCityDetails = function(cityDetails) {
    	
    	currentCity.cityDetails = cityDetails;
    	
        $('.header-city-name').html(CityView.currentCity_name);

	    $('.city-details').html(CityView.detailsTemplate(cityDetails));

        currentCity.showPage(cityDetails);
	};

	this.renderShopsList = function(cityShopsList) {
		if (cityShopsList.length>=1)
		{
	    	$('#city_Shops_list').html(CityView.poiListTemplate(cityShopsList));
	    	$('#city_Shops_list').listview('refresh');

	    	$('city-shops-not-found').hide();
    	}
    	else
    	{	$('#city_Shops_list').html('');
    		$('#city_Shops_list').listview('refresh');

	    	$('city-shops-not-found').hide();
    	}

    	translate_page();
	};

	this.showPage = function(cityDetails) {
		
	   	if (dataManager.tipo=='REMOTE')	currentCity.renderShopsList(cityDetails);
	
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

		function BuildMap( cityShopsList ){

		    var minZoomLevel = 12;

		    var latlng;
		    var latlngbounds = new google.maps.LatLngBounds();
			for (var i = 0; i < cityShopsList.length; i++) {
				latlng = new google.maps.LatLng(cityShopsList[i].lat, cityShopsList[i].lng);
			    latlngbounds.extend(latlng);
			}

		    city_map = new google.maps.Map(document.getElementById('map_city_canvas'), {
		      zoom: minZoomLevel,
		      center: new google.maps.LatLng( cityShopsList[0].lat, cityShopsList[0].lng ),
		      mapTypeId: google.maps.MapTypeId.ROADMAP,
		      disableDefaultUI: true
		    });

			city_map.fitBounds(latlngbounds);

		    //var pinImage = new google.maps.MarkerImage("css/images/marker_gtp.png");

		    Shop_markers = new Array();
		    contentString  = new Array();
		    for (var i = 0; i < cityShopsList.length; i++) {
			    
				    Shop_markers[i] = new google.maps.Marker({
				      	position: new google.maps.LatLng( cityShopsList[i].lat, cityShopsList[i].lng ),
				      	/*icon: pinImage,*/
				      	map: city_map,
	      			  	id: cityShopsList[i].id
				    });

           		markerClick_Shop(Shop_markers[i], i, cityShopsList);
			}
		}
	};
	 
 }

function markerClick_Shop(marker, i, cityShopsList)
{	
	google.maps.event.addListener(marker, 'click', function() {
	    var contentString = '<div>'+
	  						'<a href="" onClick="ShowShop('+cityShopsList[i].id+')">'+
	      						'<img src="/css/images/info_azzurra.png" style="width:80px;height:80px;">'+
	      						cityShopsList[i].name+'</a>'+
	  					'</div>';

		if (Shop_infowindow) Shop_infowindow.close();

		Shop_infowindow = new google.maps.InfoWindow({
					      content: contentString 
				  	});

		Shop_infowindow.open(city_map,marker);
	});
}

function ShowCity(id,name)
{	
	$('.banner_city').attr('src',"");
	$('.title_city').html("");
	$('#city_Shops_list').html("");

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
        {   transition: 'slideup'
        }
    );
   
   translate_page();
}

var city_map = null;
var Shop_markers = null;
var Shop_infowindow = null;

CityView.currentCity_id = null;
CityView.currentCity_name = null;
CityView.headerNameTemplate = Handlebars.compile($('#city-header-name-tpl').html());
CityView.headerImageTemplate = Handlebars.compile($('#city-header-image-tpl').html());
CityView.detailsTemplate = Handlebars.compile($('#city-tpl').html());
CityView.poiListTemplate = Handlebars.compile($('#city-poi-li-tpl').html());


