/**
 * Require config
 */
require.config({
	urlArgs: 'v=8',
	paths: {
		/* jQuery */
		'jquery': 'vendor/jquery/dist/jquery.min',

		/* Foundation */
		'foundation': 'vendor/foundation/js/foundation.min',
		// 'foundation.core': 'vendor/foundation/js/foundation/foundation',
		// 'foundation.abide': 'vendor/foundation/js/foundation/foundation.abide',
		// 'foundation.accordion': 'vendor/foundation/js/foundation/foundation.accordion',
		// 'foundation.alert': 'vendor/foundation/js/foundation/foundation.alert',
		// 'foundation.clearing': 'vendor/foundation/js/foundation/foundation.clearing',
		// 'foundation.dropdown': 'vendor/foundation/js/foundation/foundation.dropdown',
		// 'foundation.equalizer': 'vendor/foundation/js/foundation/foundation.equalizer',
		// 'foundation.interchange': 'vendor/foundation/js/foundation/foundation.interchange',
		// 'foundation.joyride': 'vendor/foundation/js/foundation/foundation.joyride',
		// 'foundation.magellan': 'vendor/foundation/js/foundation/foundation.magellan',
		// 'foundation.offcanvas': 'vendor/foundation/js/foundation/foundation.offcanvas',
		// 'foundation.orbit': 'vendor/foundation/js/foundation/foundation.orbit',
		// 'foundation.reveal': 'vendor/foundation/js/foundation/foundation.reveal',
		// 'foundation.tab': 'vendor/foundation/js/foundation/foundation.tab',
		// 'foundation.tooltip': 'vendor/foundation/js/foundation/foundation.tooltip',
		// 'foundation.topbar': 'vendor/foundation/js/foundation/foundation.topbar',

		/* Vendor Scripts */
		'jquery.cookie': 'vendor/jquery.cookie',
		'fastclick': 'vendor/fastclick/lib/fastclick',
		'modernizr': 'vendor/modernizr/modernizr',
		'placeholder': 'vendor/jquery-placeholder/jquery.placeholder',
		'fotorama': 'vendor/fotorama/fotorama',
		'ymaps': '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU',
		'handlebars': 'vendor/handlebars/handlebars.runtime.min'
	},
	shim: {
		/* Foundation all in one */
		'foundation': {
			deps: ['jquery', 'modernizr'],
			exports: 'Foundation'
		},

		/* Foundation modules */
		// 'foundation.core': {
		// 	deps: ['jquery', 'modernizr'],
		// 	exports: 'Foundation'
		// },
		// 'foundation.abide': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.accordion': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.alert': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.clearing': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.dropdown': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.equalizer': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.interchange': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.joyride': {
		// 	deps: ['foundation.core', 'jquery.cookie']
		// },
		// 'foundation.magellan': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.offcanvas': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.orbit': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.reveal': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.tab': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.tooltip': {
		// 	deps: ['foundation.core']
		// },
		// 'foundation.topbar': {
		// 	deps: ['foundation.core']
		// },

		/* Vendor Scripts */
		'jquery.cookie': {
			deps: ['jquery']
		},
		'fastclick': {
			exports: 'FastClick'
		},
		'modernizr': {
			exports: 'Modernizr'
		},
		'placeholder': {
			exports: 'Placeholders'
		},
		'fotorama': {
			deps: ['jquery'],
			exports: 'jQuery.fn.fotorama'
		},
		'ymaps': {
			exports: 'ymaps'
		},
		'handlebars': {
			exports: 'Handlebars'
		}
	},
	/* Launch app.js after config */
	deps: ['app']
});
