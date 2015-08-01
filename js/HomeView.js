var HomeView = function(dataManager) {
	
	this.getRegions = function() {
        dataManager.getRegions(this.render);
	};

	this.render = function(regions) {
        
        console.log('renderRegionsList');

        if (Array.isArray(regions))
            regions.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            })
        
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
    //currentHome.getRegions();
    currentHome.render(DataManagerRemote.lists[0]);

    HomeView.refresh = true;

    $.mobile.changePage(
        '#homePage',
        {   transition: 'fade',
        }
    );
}

$(document).on("pageshow", "#homePage", function(event) {

    RegionView.visual = true;

    if (HomeView.refresh)
    {   
        HomeView.refresh = false;

        currentHome = new HomeView(app.dataManager);
        //currentHome.getRegions();
    }
});


HomeView.refresh = false;
HomeView.regionsList = null;
HomeView.regionsListTemplate = Handlebars.compile($("#region-li-tpl").html());
