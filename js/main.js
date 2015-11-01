base_url = "http://www.gelatotour.com/api/json/icecreamshops";
currentRegion = null;
currentCity = null;
currentShop = null;

index_regions_list = 0;
index_cities_list = 1;
index_shops_list = 2;

test_PC = true;//false;//true;
//if (test_PC)    alert("RUNNING PC TEST");

function translate_page()
{

}

function translate(index)
{   
    return index;
}


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


app.name = "Gelato Tour 2015";
app.version = "1.0.1"
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
        navigator.app.exitApp();
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
    
    app.initializeDB();

});


$(document).on("pageshow", "#mapCityPage", function(event) {
    currentCity.showMap(currentCity.cityDetails);});

function ShowInfo()
{   $.mobile.changePage(
        '#infoPage',
        {   transition: 'slideup'
        }
    );
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

function Consiglia()
{   
    window.plugin.email.open({
        to:      ['info@gelatotour.it'],
        subject: 'Suggerimento gelateria',
        body:    'Compila i seguenti campi per suggerirci una gelateria da inserire<BR><BR>Nome Gelateria: <BR>Indirizzo: <BR>Città: <BR>Note: <BR>',
        isHtml:  true
    });
    
}

function Exit()
{    navigator.app.exitApp();
}

function runtimePopup(message, popupafterclose) {
    
    alert(message);
}
