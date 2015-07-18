var ShopView = function(dataManager) {

	this.getShopDetails = function(id) {

	   	$.mobile.loading("show");
		dataManager.getShop(id, currentShop.renderShopDetails );
	};

    this.renderShopDetails = function(shopDetails) {
    	
    	currentShop.shopDetails = shopDetails;

        $('#shop_description').html(shopDetails.description);
        $('#shop_master span').html(shopDetails.master);
        $('#shop_staff span').html(shopDetails.staff);
        $('#shop_opening_hours span').html(shopDetails.opening_hours);
        $('#shop_specialities span').html(shopDetails.specialities);
        $('#shop_services span').html(shopDetails.services);

        $('#shopPage #footer').html(ShopView.genericFooter());
        $("#shopPage #footer").trigger("create");

        currentShop.showPage();
        //currentShop.showMap(shopDetails);

	    return this;
	};
 
	this.showPage = function() {

		if (ShopView.already_shown==true)
		{	console.log("Rigenera pulsanti ed select");

			$('button').button();
			$('.select_buy').selectmenu();
			$('.select_play').selectmenu();
		}
		else
		{	console.log("*NON* Rigenera pulsanti ed select");
			ShopView.already_shown = true;
		}

		translate_page();

	   	$.mobile.loading("hide");
	};

	this.showMap = function(shopDetails){ 

		var div = $('#map_shop_canvas');
		var width = div.width();
		div.css('height', width);
			
		BuildMap( shopDetails.lat, shopDetails.lng );

		function BuildMap( lat_POI, long_POI ){

		    var minZoomLevel = 18;

		    var latlngbounds = new google.maps.LatLngBounds();
			latlng = new google.maps.LatLng(shopDetails.lat, shopDetails.lng);
			latlngbounds.extend(latlng);

		    var map = new google.maps.Map(document.getElementById('map_shop_canvas'), {
		      zoom: minZoomLevel,
		      center: new google.maps.LatLng( lat_POI, long_POI ),
		      mapTypeId: google.maps.MapTypeId.ROADMAP 
		    });

			map.fitBounds(latlngbounds);

		    //var pinImage = new google.maps.MarkerImage("css/images/marker_gtp.png");

		    var marker_shop = new google.maps.Marker({
		      position: new google.maps.LatLng( lat_POI, long_POI ),
			  /*icon: pinImage,*/
		      map: map
		    });

		}
	};
 }

function ShowShop(id)
{	//$.mobile.showPageLoadingMsg('a', '');

	$('.banner_poi').attr('src',"");
	$('.title_poi').html("");
	$('.poi-details').html("");
	$('#free_poi_disclaimer').html("");


    $('.banner_city').hide();
    $('.banner_poi').show();
    $('.title_city').hide();
    $('.title_poi').show();

			$.mobile.changePage(
			'#shopPage',
			{   transition: 'fade', 
	            reverse:false
	        }
	    );

	ShopView.currentShop_id = id;
}

$(document).on("pageshow", "#shopPage", function(event) {
    currentShop = new ShopView(app.dataManager);
	currentShop.getShopDetails(ShopView.currentShop_id);

	translate_page();

	try 
	{	window.plugins.insomnia.keepAwake();
	}
    catch(err)
    {}
});

$(document).on("pagebeforehide", "#shopPage", function(event) {
    console.log("shopPage UNLOAD");
	
	try 
	{	window.plugins.insomnia.allowSleepAgain();
	}
    catch(err)
    {}
});

function ShowShopMap(id)
{	
	console.log("ShowPOIMap:"+id);

	//$.mobile.showPageLoadingMsg('a', '');
	$.mobile.loading("show");


	$.mobile.changePage(
        '#shopPage',
        {   transition: 'fade'
        }
    );
   
   translate_page();
}

ShopView.currentShop_id = null;
ShopView.already_shown = true;
 
ShopView.headerNameTemplate = Handlebars.compile($("#poi-header-name-tpl").html());
ShopView.headerImageTemplate = Handlebars.compile($("#poi-header-image-tpl").html());
ShopView.detailsTemplate = Handlebars.compile($("#poi-tpl").html());

ShopView.genericFooter = Handlebars.compile($("#generic-footer").html());