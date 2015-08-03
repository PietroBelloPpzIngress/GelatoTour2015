"use strict";

function socialsharingWrapper() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.share('Gelato Tour 2015', 'Gelato Tour 2015', null, 'http://www.gelatotour.it');
    }
  });
}

function socialsharingWrapper_facebook() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaFacebook('Gelato Tour 2015', 'Gelato Tour 2015', null, null, 'http://www.gelatotour.it');
    }
  });
}

function socialsharingWrapper_twitter() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaTwitter('Gelato Tour 2015', 'Gelato Tour 2015', null, null, 'http://www.gelatotour.it');
    }
  });
}

function socialsharingWrapper_whatsup() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaTwitter('Gelato Tour 2015', 'Gelato Tour 2015', null, null, 'http://www.gelatotour.it');
    }
  });
}

