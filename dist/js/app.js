define(['jquery', 'foundation'], function($) {
	$(function() {
		// Инициализация фреймворка Foundation
		$(document).foundation({
			abide: {
				patterns: {
					phone: /^\+?[0-9]{1,4}[ ]?[0-9]{1,5}[ ]?[0-9](\-?[0-9]){2,6}\-?[0-9]$/,
					password: /^[^\s]{8,}$/,
					name: /^[а-я](\-?[а-я])*\-?[а-я]$/i,
					full_name: /^([а-я](\-?[а-я])*\-?[а-я][ ]){2}[а-я](\-?[а-я])*\-?[а-я]$/i
				}
			}
		});

		$('form').submit(function() {
			var form = $(this);
			var input = form.find('input[name="phone"]');
			alert(input.length);
			input.addClass('has-tip');
			input.attr('title', 'tooltip');
			return false;
		});

		// Подключение плагина Fotorama
		$('#fotorama').each(function() {
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
					new ymaps.Map(cont.attr('id'), {
						center: [60.153151, 30.286574],
						zoom: 13
					});
				}
			});
		})($('#map'));

		require(['templates/hello', 'helpers'], function(template) {
			console.log(template({
				name: 'Pavlikov'
			}));
		});
	});

	return {};
});
