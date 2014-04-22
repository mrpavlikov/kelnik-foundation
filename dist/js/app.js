(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'foundation'], factory);
	} else {
		root.App = factory(root.jQuery);
	}
}(this, function ($) {
	$(function() {
		// Инициализация фреймворка Foundation
		$(document).foundation({});

		// Подключение плагина Fotorama
		$('.fotorama').each(function() {
			var f = $(this);
			require(['fotorama'], function() {
				f.fotorama({});
			});
		});

		// Подключение Яндекс карт
		(function(cont) {
			if (!cont.length) return;

			require(['ymaps'], function(ymaps) {
				ymaps.ready(initMap);

				function initMap() {
					var myMap = new ymaps.Map(cont.attr('id'), {
						center: [60.153151, 30.286574],
						zoom: 13
					});
				}
			});
		})($('#map'));

		require(['map'], function(mapRoute) {
			mapRoute.init({
				tpl: tpl
			});

		});

		require(['templates/hello', 'helpers'], function(template) {
			console.log(template({
				name: 'Pavlikov'
			}));
		});
	});

	return {};
}));
