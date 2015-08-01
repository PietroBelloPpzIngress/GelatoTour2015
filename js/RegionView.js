var RegionView = function(dataManager) {

    this.id = "";
    this.regionCitiesList = [];

    this.getRegionDetails = function(region_id) {
        $.mobile.loading("show");

        for (var i = 0; i < DataManagerRemote.lists[1].length; i++) {
            if (DataManagerRemote.lists[1][i].region_id==region_id)
            {
                currentRegion.regionCitiesList.push(DataManagerRemote.lists[1][i]);
            }
        }
        currentRegion.renderRegionDetails(currentRegion.regionCitiesList);
    };
 
    this.renderRegionDetails = function(regionCitiesList) {

        currentRegion.regionCitiesList = regionCitiesList;

        $('.header-region-name').html(RegionView.currentRegion_name);

        $('.region-details').html(RegionView.detailsTemplate(regionCitiesList));

        currentRegion.showPage(regionCitiesList);

        console.log(DataManagerRemote.lists);

        for (var c = 0; c < regionCitiesList.length; c++) {
            
            regionCitiesList[c].count=0;

            for (var s = 0; s < DataManagerRemote.lists[2].length; s++) {
                if (DataManagerRemote.lists[2][s].province_id==regionCitiesList[c].id)
                {
                    regionCitiesList[c].count++;
                }
            }
        }

        currentRegion.renderCitiesList(regionCitiesList, RegionView.visual);

        for (var i = 0; i < regionCitiesList.length; i++) {
            currentRegion.updateCityShopCount(regionCitiesList[i]);
        }
    };

    this.updateCityShopCount = function(regionCity) {

        console.log(regionCity.id+" : "+regionCity.count);

        if (regionCity.count==1)
        {   
            $('.shops_counter-list#'+regionCity.id).html("1 gelateria");
            $('.shops_counter-slider#'+regionCity.id).html("1 gelateria");
        }
        else if (regionCity.count>1)
        {   
            $('.shops_counter-list#'+regionCity.id).html(regionCity.count+" gelaterie");
            $('.shops_counter-slider#'+regionCity.id).html(regionCity.count+" gelaterie");
        }

    };

    this.renderCitiesList = function(regionCitiesList, visual) {
        
        RegionView.visual = visual;

        if (visual)
        {
            console.log("Visual TRUE");

            $('#region_cities_list').html(RegionView.cityListTemplateSlider(regionCitiesList));
            currentRegion.setupCarousel();

            $('.view-icon-list').show();
            $('.view-icon-circle').hide();
        }
        else
        {
            console.log("Visual FALSE");

            if (regionCitiesList.length>=1)
            {
                $('#region_cities_list').html(RegionView.cityListTemplate(regionCitiesList));
                $('#region_cities_list').listview('refresh');
            }
            else
            {   $('#region_cities_list').html('');
                $('#region_cities_list').listview('refresh');
            }

            $('.view-icon-list').hide();
            $('.view-icon-circle').show();
        }

    };

    this.showPage = function(regionCitiesList) {
 
        console.log("Rigenera pulsanti");
        $('button').button();
        
        $.mobile.loading("hide");
    };

    this.setupCarousel = function(regionCitiesList) {
        $("#owl-demo-region").owlCarousel({
          singleItem:true
        });
        
        $(".next").on("click", function(){
            var owl = $("#owl-demo-region").data('owlCarousel');
            owl.next();
        });

        var h = $(".item").height();
        var h_orig = $('.region-city-visual-slider').height();
        $('.region-city-visual-slider').height($('.region-city-visual-slider').width());

        $(".item").height(h-h_orig+$('.region-city-visual-slider').height());

        $('.owl-controls').css('top',($('#regionPage').height()-40)+'px');
    }

     
 }

function ShowRegion(id,name)
{   
    $('.header-region-name').html("");
    $('#region_cities_list').html("");

    RegionView.refresh = true;

    $.mobile.changePage(
            '#regionPage',
            {   transition: 'fade', 
                reverse:false
            }
        );
        
    console.log("ShowRegion:"+id);

    RegionView.currentRegion_id = id;
    RegionView.currentRegion_name = name;
}

$(document).on("pageshow", "#regionPage", function(event) {

    if (RegionView.refresh)
    {   
        RegionView.refresh = false;

        currentRegion = new RegionView(app.dataManager);
        currentRegion.id = RegionView.currentRegion_id;
        currentRegion.getRegionDetails(RegionView.currentRegion_id);
    }
});

function ShowRegionMap(id)
{   
    console.log("ShowRegionMap:"+id);

    $.mobile.loading("show");

    $.mobile.changePage(
        '#mapRegionPage',
        {   transition: 'fade'
        }
    );

}

var region_map = null;

RegionView.refresh = false;
RegionView.visual = true;
RegionView.currentRegion_id = null;
RegionView.currentRegion_name = null;
RegionView.headerNameTemplate = Handlebars.compile($('#region-header-name-tpl').html());
RegionView.headerImageTemplate = Handlebars.compile($('#region-header-image-tpl').html());
RegionView.detailsTemplate = Handlebars.compile($('#region-tpl').html());
RegionView.cityListTemplate = Handlebars.compile($('#region-city-li-tpl').html());
RegionView.cityListTemplateSlider = Handlebars.compile($('#region-city-li-tpl-slider').html());

