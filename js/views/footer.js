define(['app',
  'marionette',
  'templates'
  ],
  function (app, Marionette, templates){
    return Marionette.ItemView.extend({
      initialize: function(){

      },
      template: templates.footer
    })
  });