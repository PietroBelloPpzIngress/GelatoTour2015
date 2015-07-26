"use strict";

function open_inAppBrowser(url) {
      
      var t = new Date();
      var n = t.getTime();

      var ref = window.open('url');
      ref.addEventListener('loadstart', function(event) { });
      ref.addEventListener('loadstop', function(event) { /*runtimePopup('stop: ' + event.url);*/ });
      ref.addEventListener('loaderror', function(event) { /*app.refreshPOI = true;*/  });
      ref.addEventListener('exit', function(event) { /*app.refreshPOI = true;*/ ref.close(); });
  }
