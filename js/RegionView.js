var RegionView = function(dataManager) {

    this.id = "";
    this.regionCitiesList = null;

    this.getRegionDetails = function(region_id, region_name) {
        $.mobile.loading("show");
        dataManager.getCitiesByRegion(region_id, region_name, currentRegion.renderRegionDetails );
    };
 
    this.renderRegionDetails = function(regionCitiesList) {

        currentRegion.regionCitiesList = regionCitiesList;

        $('.header-region-name').html(RegionView.currentRegion_name);

        $('.region-details').html(RegionView.detailsTemplate(regionCitiesList));

        $('#regionPage #footer').html(RegionView.genericFooter());
        $("#regionPage #footer").trigger("create");

        currentRegion.showPage(regionCitiesList);
    };

    this.renderCitiesList = function(regionCitiesList) {
        if (regionCitiesList.length>=1)
        {
            $('#region_cities_list').html(RegionView.cityListTemplate(regionCitiesList));
            $('#region_cities_list').listview('refresh');
        }
        else
        {   $('#region_cities_list').html('');
            $('#region_cities_list').listview('refresh');
        }

        translate_page();
    };

    this.showPage = function(regionCitiesList) {
        
        if (dataManager.tipo=='REMOTE') currentRegion.renderCitiesList(regionCitiesList);
 
        console.log("Rigenera pulsanti");
        $('button').button();

        translate_page();
        
        $.mobile.loading("hide");
    };

     
 }

function ShowRegion(id,name)
{   
    $('.banner_region').attr('src',"");
    $('.title_region').html("");
    $('#region_cities_list').html("");

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
    currentRegion = new RegionView(app.dataManager);
    currentRegion.id = RegionView.currentRegion_id;
    currentRegion.getRegionDetails(RegionView.currentRegion_id, RegionView.currentRegion_name);

    translate();
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
   
   translate_page();
}

var region_map = null;

RegionView.currentRegion_id = null;
RegionView.currentRegion_name = null;
RegionView.headerNameTemplate = Handlebars.compile($('#region-header-name-tpl').html());
RegionView.headerImageTemplate = Handlebars.compile($('#region-header-image-tpl').html());
RegionView.detailsTemplate = Handlebars.compile($('#region-tpl').html());
RegionView.cityListTemplate = Handlebars.compile($('#region-city-li-tpl').html());

RegionView.genericFooter = Handlebars.compile($("#generic-footer").html());

