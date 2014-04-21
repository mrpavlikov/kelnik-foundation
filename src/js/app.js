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

		(function(cont) {
			if (!cont.length) return;

			require(['yamap'], function(){
				ymaps.ready(initMap);
			});

			function initMap() {
				var myMap = new ymaps.Map(cont.attr('id'), {
					center: [60.153151, 30.286574],
					zoom: 13
				});
			}
		})($('#map'));
	});
	return {};
}));
