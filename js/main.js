//ShowHomeView = "http://grandtour.localhost";
base_url = "http://www.gelatotour.com/api/json/icecreamshops";
//base_url = "http://www.grandtourproject.com/API";
currentRegion = null;
currentCity = null;
currentShop = null;

test_PC = true;//false;//true;

function translate_page()
{

}

function translate(index)
{   
    return index;
}

if (test_PC)    alert("RUNNING PC TEST");

var app = {
    
    initializeDB: function() {

        // -------------------------------------------------------------------
        // VERSIONE CON UPDATE DEL DATABASE LOCALE DA REMOTO
        // -------------------------------------------------------------------
        /*
        $('<input>').appendTo('#startup_scrollbar').attr({'name':'slider','id':'slider','data-highlight':'true','min':'0','max':'100','value':'50','type':'range'}).slider({
            create: function( event, ui ) {
                $(this).parent().find('input').hide();
                $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
                $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
                $(this).parent().find('.ui-slider-handle').hide();
            }
        }).slider("refresh");

        app.progressBar = {
            setValue:function(id, value) {
                $(id).val(value);
                $(id).slider("refresh");
            }
        };

        app.dataManagerRemote = new DataManagerRemote();
        app.dataManagerLocal = new DataManagerLocal();

        app.dataManagerRemote.getUpdateSQLgetUpdateSQL(function(SQL_init){ app.dataManagerLocal.init(SQL_init,app.initialize);});
        */

        // -------------------------------------------------------------------
        //VERSIONE SOLO REMOTO SENZA UPDATE DEL DATABASE LOCALE
        // -------------------------------------------------------------------


        if (typeof StatusBar != 'undefined') StatusBar.backgroundColorByName("black");

        app.dataManagerRemote = new DataManagerRemote(app);
        app.dataManagerLocal = new DataManagerLocal();
        app.dataManagerLocal.init();
        //app.dataManagerLocal.get_cities();

        app.initialize();

    },

    initialize: function() {


        // -------------------------------------------------------------------
        // VERSIONE CON UPDATE DEL DATABASE LOCALE DA REMOTO
        // -------------------------------------------------------------------
        /*
        app.dataManager = app.dataManagerLocal;
        app.dataManager = app.dataManagerRemote;

        app.imageManagerLocal = new ImageManager();
        //app.dataManager.getCities( function(cities) { app.imageManagerLocal.updateImages_cities(cities, ShowHomeView()); });
        app.dataManager.getCities( function(cities) { app.imageManagerLocal.updateImages_cities(cities, ShowHomeView()); });

        */

        // -------------------------------------------------------------------
        //VERSIONE SOLO REMOTO SENZA UPDATE DEL DATABASE LOCALE
        // -------------------------------------------------------------------
        //app.dataManager = app.dataManagerLocal;
        app.dataManager = app.dataManagerRemote;

        app.deviceHelper = new DeviceHelper();
        //app.deviceHelper.wait(app);
        device_wait_start(app);

        app.userHelper = new UserHelper();

        //app.dataManager.getCities( function(cities) { ShowHomeView(); });


    },

};


app.name = "Grand Tour project";
app.version = "1.2.0"
app.dataManagerLocal = null;
app.dataManagerRemote = null;   
app.deviceHelper = null;
app.imageManagerLocal = null;
app.dataManager = null;
app.reloadHomepage = false;
app.initSlider = null;
app.refreshPOI = false;
app.purchase_video_id = null;
app.app_store_ids = null;

app.clickHandler = "click";


document.addEventListener("deviceready", function() {
    console.log("DEVICE IS READY");

    /*
    try
    { 
        pushNotification = window.plugins.pushNotification;

        if ( device.platform == 'android' || device.platform == 'Android' )
        {
            pushNotification.register(
                successHandler,
                errorHandler, {
                    "senderID":push_notification_google_senderID,
                    "ecb":"onNotificationGCM"
                });
        }
        else
        {
            pushNotification.register(
                tokenHandler,
                errorHandler, {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"onNotificationAPN"
                });
        }
    }
    catch(err)
    {
        txt="There was an error on this page.\n\n";
        txt+="Error description: " + err.message + "\n\n";
        alert(txt);
    } 
    */

    document.addEventListener("menubutton",  function(e){
            ShowOptions();
        }, false);


    if('touchend' in document.documentElement){
        clickHandler = "touchend";
    }

    

}, false);


document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#homePage')){
        e.preventDefault();
    }
    else {
        navigator.app.backHistory()
    }
}, false);

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).on("pageshow", "#splashPage", function(event) {
    
    $("#splash_big_logo").fadeIn(1000, "linear", function()
        {   
            $.mobile.loading("show");  

            app.initializeDB();
        });

});

$(document).on("pageshow", "#homePage", function(event) {
    
    if (app.reloadHomepage)
    {   currentHome = new HomeView(app.dataManager);
        currentHome.getRegions();
    }

});


$(document).on("pageshow", "#cityPage", function(event) {
    $('.banner_city').show();
    $('.banner_poi').hide();
    $('.title_city').show();
    $('.title_poi').hide();
});

$(document).on("pageshow", "#mapCityPage", function(event) {
    currentCity.showMap(currentCity.cityDetails);
    $('#mapCityPage #footer').html(ShopView.genericFooter());
    $("#mapCityPage #footer").trigger("create");});

$(document).on("pageshow", "#shopPage", function(event) {
    $('#shopPage #footer').html(ShopView.genericFooter());
    $("#shopPage #footer").trigger("create");});

$(document).on("pageshow", "#geoPage", function(event) {
    showGeolocalMap();});

$(document).on("pageshow", "#optionsPage", function(event) {
    if (app.dataManager)
        if (app.dataManager.tipo=="LOCAL")
        {   $('#radio-choice-1').prop("checked", true).checkboxradio("refresh");
            $('#radio-choice-2').prop("checked", false).checkboxradio("refresh");
        }
        else if (app.dataManager.tipo=="REMOTE")
        {   $('#radio-choice-1').prop("checked", false).checkboxradio("refresh");
            $('#radio-choice-2').prop("checked", true).checkboxradio("refresh");
        }


    $('#select-choice-language').val(app.userHelper.language_chosen);
    $('#select-choice-language').selectmenu('refresh');

    $('#select-choice-resolution').val(app.userHelper.resolution_chosen);
    $('#select-choice-resolution').selectmenu('refresh');

    $('#slider-subtitles').val(app.userHelper.subtitles_active);
    $('#slider-subtitles').slider('refresh');

    //$('#device_info').html(app.deviceHelper.uuid + " " + app.deviceHelper.platform + " " + app.deviceHelper.version + " " + app.deviceHelper.model);
    $('#app_info').html(app.name + " " + app.version);
});


function ShowStore()
{   $.mobile.changePage(
        '#storePage',
        {   transition: 'slideup'
        }
    );

    $('#storePage #footer').html(ShopView.genericFooter());
    $("#storePage #footer").trigger("create");
}

function ShowGeo()
{   $.mobile.changePage(
        '#geoPage',
        {   transition: 'slideup'
        }
    );

    $('#geoPage #footer').html(ShopView.genericFooter());
    $("#geoPage #footer").trigger("create");
}

function ShowCredits()
{   $.mobile.changePage(
        '#creditsPage',
        {   transition: 'slideup'
        }
    );

    $('#creditsPage #footer').html(ShopView.genericFooter());
    $("#creditsPage #footer").trigger("create");
}

function AdjustFontSize(container,text)
{   /*
    var originalFontSize = 32;
    var sectionWidth = $(container).width()/2;
    $(text).each(function(){
        var spanWidth = $(this).width();
        var newFontSize = (sectionWidth/spanWidth) * originalFontSize;
        $(this).css({"font-size" : newFontSize, "line-height" : newFontSize/1.2 + "px"});
    }); 
    */
}

$.mobile.back = function() {
    var nav = window.navigator;

    // if the setting is on and the navigator object is
    // available use the phonegap navigation capability
    if( this.phonegapNavigationEnabled &&
        nav &&
        nav.app &&
        nav.app.backHistory ){
        nav.app.backHistory();
    } else {
        window.history.back();
    }
};

function Exit()
{    navigator.app.exitApp();
}

function runtimePopup(message, popupafterclose) {
    var template = "<div data-role='popup' data-theme='e' data-overlay-theme='a'  data-shadow='true' class='ui-content messagePopup' style='max-width:280px'>"
        + "<a href='#' data-role='button' data-theme='g' data-icon='delete' data-iconpos='notext' "
        + " class='ui-btn-right closePopup'>Close</a> <span style='text-align:center;min-width:240px;min-height:100px;font-weight:bold;valing:middle;'> "
        + message + " </span> </div>";
    popupafterclose = popupafterclose ? popupafterclose : function () {};
     
    $.mobile.activePage.append(template).trigger("create");
     
    $.mobile.activePage.find(".closePopup").bind("tap", function (e) {
            $.mobile.activePage.find(".messagePopup").popup("close");
        });
     
    $.mobile.activePage.find(".messagePopup").popup().popup("open").bind({
                popupafterclose: function () {
                    $(this).unbind("popupafterclose").remove();
                    popupafterclose();
            }
        });
}
