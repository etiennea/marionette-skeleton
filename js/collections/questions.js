require([
    'backbone',
    'app'
    ], function (Backbone, app) {
        return Backbone.Collection.extend({
            parse: function(data)
            {
                data = data.response;

                if(data.length == 0) return;

                return data;
            },
            model: app.models.question
        })
    });