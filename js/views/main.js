define(['app',
  'marionette',
  'templates'
  ],
  function (app, Marionette, templates){
    return Marionette.ItemView.extend({
      initialize: function(){
        console.log('main loaded!')
      },
      template: templates.main
    })
  });