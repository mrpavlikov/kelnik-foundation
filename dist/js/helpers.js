(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        factory(root.Handlebars);
    }
}(this, function (Handlebars) {
	Handlebars.registerHelper('mr', function(text) {
		return 'mr. ' + text;
	});

	Handlebars.registerHelper('mrs', function(text) {
		return 'mrs. ' + text;
	});

	return Handlebars;
}));
