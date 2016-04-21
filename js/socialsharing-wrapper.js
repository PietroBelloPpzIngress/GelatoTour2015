"use strict";

function socialsharingWrapper() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.share('Gelato Tour 2016\nhttp://www.gelatotour.it\nApp iOS https://goo.gl/6d0h0F\nApp Android https://goo.gl/aZ6&jJ', 'Gelato Tour 2016', null, '');
    }
  });
}

function socialsharingWrapper_facebook() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaFacebook('Gelato Tour 2016\nhttp://www.gelatotour.it\nApp iOS https://goo.gl/6d0h0F\nApp Android https://goo.gl/aZ6&jJ', 'Gelato Tour 2016', null, null, '');
    }
  });
}

function socialsharingWrapper_twitter() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaTwitter('Gelato Tour 2016\nhttp://www.gelatotour.it\nApp iOS https://goo.gl/6d0h0F\nApp Android https://goo.gl/aZ6&jJ', 'Gelato Tour 2016', null, null, '');
    }
  });
}

function socialsharingWrapper_whatsup() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaTwitter('Gelato Tour 2016\nhttp://www.gelatotour.it\nApp iOS https://goo.gl/6d0h0F\nApp Android https://goo.gl/aZ6&jJ', 'Gelato Tour 2016', null, null, '');
    }
  });
}

