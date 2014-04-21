(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'foundation'], factory);
	} else {
		root.App = factory(root.jQuery);
	}
}(this, function ($) {
	$(function() {
		$(document).foundation({});

		$('.fotorama').each(function() {
			var f = $(this);
			require(['fotorama'], function() {
				f.fotorama({});
			});
		});
	});
	return {};
}));
