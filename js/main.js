requirejs.config({
	paths : {
		backbone: '../bower_components/backbone/backbone',
		requireLib: '../bower_components/requirejs/require',
		underscore: '../bower_components/underscore/underscore',
		jquery: '../bower_components/jquery/dist/jquery.min',
		marionette: '../bower_components/marionette/lib/backbone.marionette.min',
		text: '../bower_components/requirejs-text/text'
	},
	shim : {
	},
	deps : ['jquery','underscore','requireLib']
});

requirejs(['app',
	'marionette',
	'router',
	'controller',
	'models',
	'collections',
	'templates',
	'views'
	], function(app, Marionette, Router, Controller, Models, Collections, Templates, Views){

		"use strict";

		//ejs template loading
		Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
			var template = templateId;
			if (!template || template.length === 0){
				var msg = "Could not find template: '" + templateId + "'";
				var err = new Error(msg);
				err.name = "NoTemplateError";
				throw err;
			}
			return template;
		};

		$(function(){

    		//jquery cross browser authentication
    		if(typeof token === 'undefined'){
    			$.ajaxSetup({
    				xhrFields: {
    					withCredentials: true
    				},
    				crossDomain: true,
    				cache: false
    			});
    			$.support.cors = true;
    		}

    		//link handling
    		$('body').on('click', 'a', function(e){
    			var cur = $(e.currentTarget);
    			var href = cur.attr('href');
    			if(href && href == "#")
    				return e.preventDefault();
    			if(href && !cur.hasClass('external')){
    				e.preventDefault();
    				app.router.navigate(cur.attr('href'), {trigger: true});
    				$("main").delay(200).animate({ scrollTop: 0 }, 300);
    			}
    		});
    	});

		app.addInitializer(function(options){
			app.baseUrl = api + '/1';
			app.token = token;

			app.addRegions({
				header      : 'header',
				main        : 'main',
				footer      : 'footer'
			});

			app.models = Models;
			app.collections = Collections;
			app.views = Views;
			app.events = {};
			_.extend(app.events, Backbone.Events);

			app.router = new Router({
				controller : Controller,
			});
		})

		app.on("start", function(options){
			if (Backbone.history){  Backbone.history.start({pushState: true}); }
			app.header.show(new app.views.header());
			app.footer.show(new app.views.footer());
			app.account = new app.models.account();
			app.account.fetch();
		});

		app.start();



	});
