define('app', [
    'jquery',
    'foundation'
], function application(
    $
) {
    'use strict';

    /* jshint ignore:start */
    $(document).foundation({
        abide : {
            patterns : {
                phone     : /^(\+[ ]?)?[0-9]{1,4}[ ]?([0-9]{1,5}|[(][0-9]{1,5}[)])[ ]?[0-9]([\- ]?[0-9]){2,6}[\- ]?[0-9]$/,
                password  : /^[^\s]{6,}$/,
                name      : /^[а-я](\-?[а-я])*\-?[а-я]$/i,
                full_name : /^([а-я](\-?[а-я])*\-?[а-я][ ]){2}[а-я](\-?[а-я])*\-?[а-я]$/i
            },

            live_validate : false
        }
    });
    /* jshint ignore:end */

    // Подключение плагина Fotorama
    (function initFotorama(list) {
        if (!list.length) {
            return;
        }

        var fotorama = function() {
            $(this).fotorama({});
        };

        require(['fotorama'], function onFotoramaLoaded() {
            list.each(fotorama);
        });
    })($('.fotorama'));

    // Подключение Яндекс карт
    (function initYmaps(cont) {
        if (!cont) {
            return;
        }

        require(['ymaps'], function onMapsLoaded(ymaps) {
            var map;
            var initMap = function() {
                map = new ymaps.Map(cont.id, {
                    center : [60.153151, 30.286574],
                    zoom   : 13
                });
            };
            ymaps.ready(initMap);
        });
    })(document.querySelector('#map'));

    return {};
});
