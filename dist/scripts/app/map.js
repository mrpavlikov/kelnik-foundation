/**
 * Пример подключения яндекс-карт
 */
define(['ymaps'], function onMapsLoaded(ymaps) {
    'use strict';

    var ret = function() {
        var initMap = function() {
            return new ymaps.Map('map', {
                center : [60.153151, 30.286574],
                zoom   : 13
            });
        };
        ymaps.ready(initMap);
    };

    return ret;
});
