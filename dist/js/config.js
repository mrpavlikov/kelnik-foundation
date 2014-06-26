/* jshint ignore:start */
require.config({
    paths: {
        /* jQuery */
        'jquery'       : 'vendor/jquery/dist/jquery.min',

        /* Foundation */
        'foundation'   : 'vendor/foundation/js/foundation.min',

        /* Vendors */
        'jquery.cookie': 'vendor/jquery.cookie',
        'fastclick'    : 'vendor/fastclick/lib/fastclick',
        'modernizr'    : 'vendor/modernizr/modernizr',
        'placeholder'  : 'vendor/jquery-placeholder/jquery.placeholder',
        'fotorama'     : 'vendor/fotorama/fotorama',
        'ymaps'        : '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU',
        'handlebars'   : 'vendor/handlebars/handlebars.runtime.min'
    },
    shim: {
        /* Foundation all in one */
        'foundation': {
            deps   : ['jquery', 'modernizr'],
            exports: 'Foundation'
        },

        /* Vendor Scripts */
        'jquery.cookie': {
            deps   :['jquery']
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
            deps   : ['jquery'],
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
