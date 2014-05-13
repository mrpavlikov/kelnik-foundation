define(['jquery', 'foundation'], function($) {

	$(function() {
		// Инициализация фреймворка Foundation
		$(document).foundation({
			abide: {
				patterns: {
					phone: /^(\+[ ]?)?[0-9]{1,4}[ ]?([0-9]{1,5}|[(][0-9]{1,5}[)])[ ]?[0-9]([\- ]?[0-9]){2,6}[\- ]?[0-9]$/,
					password: /^[^\s]{6,}$/,
					name: /^[а-я](\-?[а-я])*\-?[а-я]$/i,
					full_name: /^([а-я](\-?[а-я])*\-?[а-я][ ]){2}[а-я](\-?[а-я])*\-?[а-я]$/i
				},
				live_validate: false
			}
		});

		(function(forms) {
			if (!forms.length) return;
			require(['form'], function(Form) {
				forms.each(function() {
					var form = new Form($(this));

					// form.onSuccess = function(data) {
					// 	alert('Custom on success');
					// 	console.log(data);
					// 	return true; // чтобы отменить стандартный обработчик
					// }

					// form.onError = function(data) {
					// 	alert('Custom on error');
					// 	console.log(data);
					// 	return true; // чтобы отменить стандартный обработчик
					// }

					form.init();
				});
			});
		})($('form'));


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
