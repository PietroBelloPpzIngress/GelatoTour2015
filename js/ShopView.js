var ShopView = function(dataManager) {

	this.getShopDetails = function(id) {

	   	$.mobile.loading("show");
		//dataManager.getShop(id, currentShop.renderShopDetails );

		var shopDetails = null;
        for (var i = 0; i < DataManagerRemote.lists[index_shops_list].length; i++) {
            if (DataManagerRemote.lists[index_shops_list][i].id==id)
            {
                shopDetails = DataManagerRemote.lists[index_shops_list][i];
                break;
            }
        }
        currentShop.renderShopDetails(shopDetails);
	};

    this.renderShopDetails = function(shopDetails) {
    	
    	currentShop.shopDetails = shopDetails;

        $('.header-shop-name').html(shopDetails.city);

    	$('#shop_name').html(shopDetails.name);
    	$('#shop_address').html(shopDetails.address + ' - ' + shopDetails.city);

    	if (typeof shopDetails.slogan === "undefined" || shopDetails.slogan.trim()=="")
		{	$('#shop_slogan').html();
		}
		else
		{	$('#shop_slogan').html('"'+shopDetails.slogan+'"');
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

        currentShop.renderShopGallery(shopDetails.gallery);

        currentShop.showPage();
        currentShop.showMap(shopDetails);

        //shopFotoExists(shopDetails.id);
        //shopFotoExists('5184');

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

	this.renderShopGallery = function(shopGallery)
	{
    	currentShop.gallery = shopGallery;

    	if (shopGallery.length>0)
    	{
			$('#map_thumbnail_foto').css({'background-image':'url(http://www.gelatotour.com/img/shops/'+ShopView.currentShop_id+'/gallery/1400x800/'+shopGallery[0]+')'});
	      	//$('#foto_shop').css({'background-image': 'url(http://www.gelatotour.com/img/shops/'+ShopView.currentShop_id+'/gallery/1400x800/'+shopGallery[0]+')'});
	      	$('#map_thumbnail_foto').show();

	      	$('#gallery_list').html('<div id="owl-demo-shop" class="owl-carousel owl-theme"></div>');
	      	$.each(shopGallery , function(index, value ) { 
	      		if (value!=false)
	      		{	$('#owl-demo-shop').append('<div class="item"><div class="shop-slider" style="background-image:url(\'http://www.gelatotour.com/img/shops/'+ShopView.currentShop_id+'/gallery/1400x800/'+value+'\')"></div></div>');
	      		}
	      	});

	      	currentShop.setupCarousel();
	    }
	    else
	    {
	    	$('#map_thumbnail_foto').hide();
	    }
    }

    this.setupCarousel = function(regionCitiesList) {
        $("#owl-demo-shop").owlCarousel({
          singleItem:true
        });
        
        $(".next").on("click", function(){
            var owl = $("#owl-demo-shop").data('owlCarousel');
            owl.next();
        });

        $("#owl-demo-shop .owl-item").width($('#shopPage').width());
        $(".shop-slider").width($('#shopPage').width());
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

		var mask = $('#map_shop_mask');
		mask.css('width', width+2);
		mask.css('height', width+2);
		mask.css('margin', '-1px -1px');
			
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

		    var pinImage = new google.maps.MarkerImage("css/images/pin.brightred.png");

		    var marker_shop = new google.maps.Marker({
		      position: new google.maps.LatLng( shopDetails.lat, shopDetails.lng ),
			  icon: pinImage,
		      map: map
		    });

		} 
	};
 }


function shopFotoExists(id){
  $.ajax({
    type: 'HEAD',
    url: 'http://www.gelatotour.com/img/shops/'+id+'/gallery/1400x800/Senzanome.jpg',
    success: function(){
      $('#map_thumbnail_foto').css('background-image', "url('http://www.gelatotour.com/img/shops/"+id+"/gallery/1400x800/Senzanome.jpg')");
      $('#foto_shop').css('background-image', "url('http://www.gelatotour.com/img/shops/"+id+"/gallery/1400x800/Senzanome.jpg')");
      $('#map_thumbnail_foto').show();
      console.log(id);
    },
    error: function() {
      $('#map_thumbnail_foto').hide();
    }
  });
}

function ShowShop(id)
{	//$.mobile.showPageLoadingMsg('a', '');

    $('#shopPage #slider_container').hide();

			$.mobile.changePage(
			'#shopPage',
			{   transition: 'fade', 
	            reverse:false
	        }
	    );

	ShopView.currentShop_id = id;
}

$(document).on("pageshow", "#shopPage", function(event) {
    
	$('#shop_slogan').html();
	$('#map_thumbnail_foto').hide();
	$('#map_thumbnail_map').hide();
    $('#shopPage #slider_container').hide();

    $('#shopPage #map_shop_canvas_container').show();

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
ShopView.gallery = true;
 
ShopView.headerNameTemplate = Handlebars.compile($("#poi-header-name-tpl").html());
ShopView.headerImageTemplate = Handlebars.compile($("#poi-header-image-tpl").html());
ShopView.detailsTemplate = Handlebars.compile($("#poi-tpl").html());
