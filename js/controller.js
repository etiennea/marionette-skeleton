define([
	'app'
	], function (app) {

		"use strict";

		return {
			load_main:function(){
				app.main.show(new app.views.main());
			}


		}

	});