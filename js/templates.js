
define(function(require){

	"use strict";
	return {
		main		        : require('text!templates/main.ejs'),
		header		        : require('text!templates/header.ejs'),
		footer		        : require('text!templates/footer.ejs')
	};
});
