/**
 * Created by Etienne Adriaenssen on 7/20/14.
 */

 /*global $*/
 define('app',

    ['backbone',
    'marionette'
    ],

    function(Backbone, Marionette){
        "use strict";

        var app = new Marionette.Application();

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
