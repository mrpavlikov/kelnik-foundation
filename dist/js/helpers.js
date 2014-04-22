define(['handlebars'], function (Handlebars) {
	Handlebars.registerHelper('mr', function(text) {
		return 'mr. ' + text;
	});

	Handlebars.registerHelper('mrs', function(text) {
		return 'mrs. ' + text;
	});

	return Handlebars;
});
