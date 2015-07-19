var ShopView = function(dataManager) {

	this.getShopDetails = function(id) {

	   	$.mobile.loading("show");
		dataManager.getShop(id, currentShop.renderShopDetails );
	};

    this.renderShopDetails = function(shopDetails) {
    	
    	currentShop.shopDetails = shopDetails;


        $('.header-shop-name').html(shopDetails.city);

    	$('#shop_name').html(shopDetails.name);
    	$('#shop_address').html(shopDetails.address);

    	if (typeof shopDetail === "undefined" || shopDetail.trim()=="")
		{	$('#shop_slogan').html();
		}
		else
		{	$('#shop_slogan').html("'"+shopDetails.slogan+"'");
		}
    	
    	currentShop.renderShopContactsSingle(shopDetails.phone, 'shop_phone', 'tel:'+shopDetails.phone, 'telefono' );
		currentShop.renderShopContactsSingle(shopDetails.email, 'shop_mail','mailto:'+shopDetails.email, 'mail');
    	currentShop.renderShopContactsSingle(shopDetails.website, 'shop_link', shopDetails.website, 'link');
    	currentShop.renderShopContactsSingle("ALWAYS", 'shop_routing', 'geo:'+shopDetails.lat+','+shopDetails.lng+'?q='+shopDetails.lat+','+shopDetails.lng+'('+shopDetails.name+')', 'routing');

    	currentShop.renderShopDetailsSingle(shopDetails.description, 'shop_description');
        currentShop.renderShopDetailsSingle(shopDetails.master, 'shop_master');
        currentShop.renderShopDetailsSingle(shopDetails.staff, 'shop_staff');
        currentShop.renderShopDetailsSingle(shopDetails.opening_hours, 'shop_opening_hours');
        currentShop.renderShopDetailsSingle(shopDetails.specialities, 'shop_specialities');
        currentShop.renderShopDetailsSingle(shopDetails.services, 'shop_services');

        currentShop.showPage();
        currentShop.showMap(shopDetails);

	    return this;
	};

	this.renderShopDetailsSingle = function(shopDetail, element_id)
	{
		if (typeof shopDetail === "undefined" || shopDetail.trim()=="")
		{	$('#'+element_id).hide();
		}
		else
		{	$('#'+element_id+' span').html(shopDetail);
			$('#'+element_id).show();
		}
	}

	this.renderShopContactsSingle = function(shopContact, element_id, link, image)
	{
		if (typeof shopContact === "undefined" || shopContact.trim()=="")
		{	$('#'+element_id).removeClass("contact_enabled");
			$('#'+element_id).addClass("contact_disabled");

			$('#'+element_id).html('<img src="css/images/'+image+'.png" style="opacity:0.33;">');
		}
		else
		{	console.log(element_id+' : "'+shopContact+'"');

			$('#'+element_id).removeClass("contact_disabled");
			$('#'+element_id).addClass("contact_enabled");

			if (element_id=="shop_link")
				$('#'+element_id).html('<a href="" onClick="navigator.app.loadUrl(\''+link+'\', { openExternal:true })"><img src="css/images/'+image+'.png"></a>');
			else
				$('#'+element_id).html('<a href="'+link+'"><img src="css/images/'+image+'.png"></a>');
		}
	}
 
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
			
		BuildMap( shopDetails );

		function BuildMap( shopDetails ){

	   	
	console.log("LAT: "+shopDetails.lat+" - LNG: "+shopDetails.lng);

		    var minZoomLevel = 18;
/*
		    var latlngbounds = new google.maps.LatLngBounds();
			latlng = new google.maps.LatLng(shopDetails.lat, shopDetails.lng);
			latlngbounds.extend(latlng);
*/
		    var map = new google.maps.Map(document.getElementById('map_shop_canvas'), {
		      zoom: minZoomLevel,
		      center: new google.maps.LatLng( shopDetails.lat, shopDetails.lng ),
		      mapTypeId: google.maps.MapTypeId.ROADMAP,
		      disableDefaultUI: true 
		    });

			//map.fitBounds(latlngbounds);

		    //var pinImage = new google.maps.MarkerImage("css/images/marker_gtp.png");

		    var marker_shop = new google.maps.Marker({
		      position: new google.maps.LatLng( shopDetails.lat, shopDetails.lng ),
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

/*
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
*/

ShopView.currentShop_id = null;
ShopView.already_shown = true;
 
ShopView.headerNameTemplate = Handlebars.compile($("#poi-header-name-tpl").html());
ShopView.headerImageTemplate = Handlebars.compile($("#poi-header-image-tpl").html());
ShopView.detailsTemplate = Handlebars.compile($("#poi-tpl").html());
