define(['marionette'],function(Marionette) {
	'use strict';

	return Marionette.AppRouter.extend({

		appRoutes:{
			'*actions'		        : 'load_main'
		}

	});

});
