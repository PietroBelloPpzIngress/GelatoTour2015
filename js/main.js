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
/*        
        app.dataManagerRemote.getLists(index_regions_list, "http://www.gelatotour.com/api/json/regions/listall.php", function(){

            app.dataManagerRemote.getLists(index_cities_list, "http://www.gelatotour.com/api/json/zones/listall.php", function(){
            
                app.dataManagerRemote.getLists(index_shops_list, "http://www.gelatotour.com/api/json/icecreamshops/listall.php", function(){

                    
                            ShowHomeView();

                        });
                });
            });
*/
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
app.version = "1.0.0"
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

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


}, false);

/* WRITE FILE */
 function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);  
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    }

    function fail(error) {
        console.log(error.code);
    }
/* WRITE FILE - end */

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

    /*
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
    */
}
