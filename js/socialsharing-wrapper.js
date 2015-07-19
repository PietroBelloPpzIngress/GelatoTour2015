"use strict";

function socialsharingWrapper() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.share('App Socialsharing', 'Grand Tour Project', null, 'http://www.grandtourproject.com');
    }
  });
}

function socialsharingWrapper_facebook() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaFacebook('App Socialsharing', 'Grand Tour Project', null, null, 'http://www.grandtourproject.com');
    }
  });
}

function socialsharingWrapper_twitter() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaTwitter('App Socialsharing', 'Grand Tour Project', null, null, 'http://www.grandtourproject.com');
    }
  });
}

function socialsharingWrapper_whatsup() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.shareViaTwitter('App Socialsharing', 'Grand Tour Project', null, null, 'http://www.grandtourproject.com');
    }
  });
}


/*
socialsharingWrapper('{{this.name}} is Amazing', 'Grand Tour Project : '+{{this.name}} , {{this.thumbnail_file_name}}, 'http://www.grandtourproject.com')

function socialsharingWrapper(text, subject, image, url) {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      window.plugins.socialsharing.share('App Socialsharing', 'Grand Tour Project', null, 'http://www.grandtourproject.com');
    }
  });
}

function socialsharingWrapper(text, subject, image, url, selected_social) {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      switch(selected_social)
      {
        case "facebook":
          window.plugins.socialsharing.shareViaFacebook(text, subject, image, url);
          break;
        case "twitter":
          window.plugins.socialsharing.shareViaTwitter(text, subject, image, url);
          break;
        case "whatsapp":
          window.plugins.socialsharing.shareViaWhatsApp(text, subject, image, url);
          break;
        case "all":
          window.plugins.socialsharing.share(text, subject, image, url);
          break;
        default:
          window.plugins.socialsharing.share(text, subject, image, url);
      }
    }
  });
}
*/