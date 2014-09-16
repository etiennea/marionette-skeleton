/**
 * Created by Etienne Adriaenssen on 7/20/14.
 */

 /*global $*/
 define(

    ['backbone',
    'marionette',
    'models',
    'collections',
    'templates',
    'views'
    ],

    function(Backbone, Marionette, Models, Collections, Templates, Views){
        "use strict";

        var app = new Marionette.Application();

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
        })

        app.addInitializer(function(options){
            Backbone.history.start({pushState: true});
        })

        app.strip = function(str) {
            return (str + '').replace(/\\(.?)/g, function (s, n1) {
                switch (n1) {
                    case '\\':
                    return '\\';
                    case '0':
                    return '\u0000';
                    case '':
                    return '';
                    default:
                    return n1;
                }
            });
        }

        app.API = function(endpoint) {
            return function(id, path) {
                var url = app.baseUrl + endpoint;

                if (id)
                    url = url.replace(/([^\/])$/, '$1/') + encodeURIComponent(id);

                if (path)
                    url += path;

                if (app.token && app.token != 'undefined') {
                    var symbol = url.indexOf('?') > 0 ? '&' : '?';
                    url += symbol + 'access_token=' + app.token;
                }

                return url;
            }
        };

        return app;

    }
    );
