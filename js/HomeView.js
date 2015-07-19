var HomeView = function(dataManager) {
	
	this.getRegions = function() {
        dataManager.getRegions(this.render);
	};

	this.getRegionByName = function() {
	    dataManager.Region_findByName($('.search-key').val(), this.renderRegionsList);
	};

	this.render = function(regions, free_POIs) {
        
        console.log('renderRegionsList');
        
        HomeView.regionsList = regions;

        $('#regions_list').html(HomeView.regionsListTemplate(regions));
        //$('#regions_list').html(renderRegionsList());
        $('#regions_list').listview('refresh');

        translate_page();

        $.mobile.loading("hide");
    };
}

function ShowHomeView()
{   //$.mobile.showPageLoadingMsg('a', '');
    $.mobile.loading("show");

    currentHome = new HomeView(app.dataManager);
    currentHome.getRegions();

    $.mobile.changePage(
        '#homePage',
        {   transition: 'fade',
        }
    );
}

$(document).on("pageshow", "#homePage", function(event) {
    if (app.reloadHomepage)
    {   currentHome = new HomeView(app.dataManager);
        currentHome.getRegions();

        translate_page();
    }
});

HomeView.regionsList = null;
HomeView.regionsListTemplate = Handlebars.compile($("#region-li-tpl").html());
