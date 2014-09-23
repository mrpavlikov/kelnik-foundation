/* jshint ignore:start */
require.config({
    baseUrl: '/scripts/lib',

    paths : {
        app             : '../app',
        tpl             : '../tpl',

        jquery          : 'jquery/dist/jquery.min',
        foundation      : 'foundation/js/foundation.min',
        'jquery.cookie' : 'jquery.cookie',
        fastclick       : 'fastclick/lib/fastclick',
        modernizr       : 'modernizr/modernizr',
        placeholder     : 'jquery-placeholder/jquery.placeholder',
        fotorama        : 'fotorama/fotorama',
        ymaps           : '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU',
        handlebars      : 'handlebars/handlebars.runtime.min'
    },
    shim : {
        foundation : {
            deps    : ['jquery', 'modernizr'],
            exports : 'Foundation'
        },

        'jquery.cookie' : {
            deps   : ['jquery']
        },
        fastclick : {
            exports: 'FastClick'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        placeholder: {
            exports: 'Placeholders'
        },
        fotorama: {
            deps   : ['jquery'],
            exports: 'jQuery.fn.fotorama'
        },
        ymaps: {
            exports: 'ymaps'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    /* Launch app.js after config */
    deps: ['app']
});
