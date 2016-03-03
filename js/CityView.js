var CityView = function(dataManager) {

	this.id = "";
	this.cityDetails = null;

	this.getCityDetails = function(region_id, region_name, city_id, city_name) {
		/*
		$.mobile.loading("show");

		dataManager.getShopsByCity(region_id, region_name, city_id, city_name, currentCity.renderCityDetails , function() {*/

	    	var cityShopsList = [];
	        for (var i = 0; i < DataManagerRemote.lists[index_shops_list].length; i++) {
	            if (DataManagerRemote.lists[index_shops_list][i].province_id==city_id)
	            {
	                cityShopsList.push(DataManagerRemote.lists[index_shops_list][i]);
	            }
	        }
	        currentCity.renderCityDetails(cityShopsList);
	    /*});*/
	};
 
    this.renderCityDetails = function(cityDetails) {
    
    	currentCity.cityDetails = cityDetails;
    	
        $('.header-city-name').html(CityView.currentCity_name);

	   	currentCity.renderShopsList(cityDetails);

        currentCity.showPage(cityDetails);
	};

	this.renderShopsList = function(cityShopsList) {
		
		
	        if (Array.isArray(cityShopsList))
            cityShopsList.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            })

		if (cityShopsList.length>=1)
		{
	    	$('#city_Shops_list').html(CityView.shopsListTemplate(cityShopsList));
	    	$('#city_Shops_list').listview('refresh');

	    	$('city-shops-not-found').hide();
    	}
    	else
    	{	$('#city_Shops_list').html('');
    		$('#city_Shops_list').listview('refresh');

	    	$('city-shops-not-found').hide();
    	}

		for (var i = 0; i < cityShopsList.length; i++) {
			if (cityShopsList[i].cover)
			{
				$('.shop-city-visual#'+cityShopsList[i].id).css("background-image","url('http://www.gelatotour.com/img/shops/"+cityShopsList[i].id+"/cover_800x600.jpg')");
	      		$('.shop-city-visual#'+cityShopsList[i].id).show();
			}
			else
			{
	      		$('.shop-city-visual#'+cityShopsList[i].id).hide();
			}
		}
	};

	this.showPage = function(cityDetails) {

	   	console.log("Rigenera pulsanti");
		$('button').button();
		
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

			//minZoomLevel = city_map.getZoom();
			//city_map.setZoom(minZoomLevel);

		    var pinImage = new google.maps.MarkerImage("css/images/pin.brightred.png");

		    Shop_markers = new Array();
		    contentString  = new Array();
		    for (var i = 0; i < cityShopsList.length; i++) {
			    
				    Shop_markers[i] = new google.maps.Marker({
				      	position: new google.maps.LatLng( cityShopsList[i].lat, cityShopsList[i].lng ),
				      	icon: pinImage,
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
	    var contentString = '<div class="map_marker_content">'+
	  						'<a href="" onClick="ShowShop('+cityShopsList[i].id+')">'+
	      						cityShopsList[i].name+
	      						'<!--<img src="css/images/info_azzurra.png">-->'+
	      						'</a>'+
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
	$('.header-city-name').html("");
	$('#city_Shops_list').html("");

	CityView.refresh = true;

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

	if (CityView.refresh)
    {	
		CityView.refresh = false;

		currentCity = new CityView(app.dataManager);
		currentCity.id = CityView.currentCity_id;
		currentCity.getCityDetails(RegionView.currentRegion_id, RegionView.currentRegion_name,CityView.currentCity_id,CityView.currentCity_name);
	}
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
   
}

var city_map = null;
var Shop_markers = null;
var Shop_infowindow = null;

CityView.refresh = false;
CityView.currentCity_id = null;
CityView.currentCity_name = null;
CityView.headerNameTemplate = Handlebars.compile($('#city-header-name-tpl').html());
CityView.headerImageTemplate = Handlebars.compile($('#city-header-image-tpl').html());
CityView.shopsListTemplate = Handlebars.compile($('#city-shops-li-tpl').html());


