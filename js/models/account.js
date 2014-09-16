define(['backbone'], function(Backbone) {

	var Account = Backbone.Model.extend({
		initialize: function() {
			this.on("change", this.modelChanged, this);
		},
		url: api+'/1/account',
		modelChanged: function() {
			this.save();
		}
	});

	return Account;
});