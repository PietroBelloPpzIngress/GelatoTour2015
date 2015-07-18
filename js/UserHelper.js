var UserHelper = function(successCallback, errorCallback) {
	
	UserHelper.id = "";
	UserHelper.email = "";
	UserHelper.password = "";
	UserHelper.language_default = "";
	UserHelper.language_chosen = "English";
	UserHelper.nationality = "";
	UserHelper.subtitles_active = "";
	UserHelper.resolution_chosen = "";

	UserHelper.facebook_id = "";
	UserHelper.facebook_email = "";
	UserHelper.facebook_name = "";
	UserHelper.facebook_username = "";
	UserHelper.facebook_first_name = "";
	UserHelper.facebook_last_name = "";
	UserHelper.facebook_gender = "";
	UserHelper.facebook_link = "";
	UserHelper.facebook_locale = "";
	UserHelper.facebook_timezone = "";
	UserHelper.facebook_start_date = "";
	UserHelper.facebook_updated_time = "";
	UserHelper.facebook_verified = "";

	UserHelper.browser = "";
 
	this.init = function(json_in, callback) {

		try
		{	UserHelper.id     				= json_in.id;
			UserHelper.email     			= json_in.email;
			UserHelper.password 			= json_in.password;
			UserHelper.language_default     = json_in.language_default;
			UserHelper.language_chosen    	= json_in.language_chosen;
			UserHelper.nationality  		= json_in.nationality;
			UserHelper.subtitles_active  	= json_in.subtitles_active;
			UserHelper.resolution_chosen  	= json_in.resolution_chosen;

			UserHelper.facebook_id 			= json_in.facebook_id;
			UserHelper.facebook_email 		= json_in.facebook_email;
			UserHelper.facebook_name 		= json_in.facebook_name;
			UserHelper.facebook_username 	= json_in.facebook_username;
			UserHelper.facebook_first_name 	= json_in.facebook_first_name;
			UserHelper.facebook_last_name 	= json_in.facebook_last_name;
			UserHelper.facebook_gender 		= json_in.facebook_gender;
			UserHelper.facebook_link 		= json_in.facebook_link;
			UserHelper.facebook_locale 		= json_in.facebook_locale;
			UserHelper.facebook_timezone 	= json_in.facebook_timezone;
			UserHelper.facebook_start_date 	= json_in.facebook_start_date;
			UserHelper.facebook_updated_time= json_in.facebook_updated_time;
			UserHelper.facebook_verified 	= json_in.facebook_verified;

			SelectLanguage(UserHelper.language_chosen);
		}
		catch(err)
		{	//Handle errors here
		}

		console.log(json_in);
	}

	this.init_from_facebook = function(json_in, callback) {

		try
		{	this.facebook_id 			= json_in.id;
			this.facebook_email 		= json_in.email;
			this.facebook_name 		= json_in.name;
			this.facebook_username 	= json_in.username;
			this.facebook_first_name 	= json_in.first_name;
			this.facebook_last_name 	= json_in.last_name;
			this.facebook_gender 		= json_in.gender;
			this.facebook_link 		= json_in.link;
			this.facebook_locale 		= json_in.locale;
			this.facebook_timezone 	= json_in.timezone;
			this.facebook_start_date 	= json_in.start_date;
			this.facebook_updated_time= json_in.updated_time;
			this.facebook_verified 	= json_in.verified;

			SelectLanguage(this.language_chosen);
		}
		catch(err)
		{	//Handle errors here
		}

		callback();

		console.log(json_in);
	}

	this.toArray = function(callback) {
		arrToReturn = { email 	 : this.email,
						password : this.password,
						facebook_id : this.facebook_id,
						language_default     : this.language_default,
						language_chosen    : this.language_chosen,
						nationality  : this.nationality,
						subtitles_active  : this.subtitles_active,
						resolution_chosen  : this.resolution_chosen
					 } ;
		return arrToReturn;
	}

	this.toJSON = function(callback) {
		strToReturn = JSON.stringify( this.toArray() ); 
		return strToReturn;
	}

}
