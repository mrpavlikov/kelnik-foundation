define('app', [
    'jquery',
    'foundation'
], function application(
    $
) {
    'use strict';

    $(document).foundation({
        abide : {
            /* jshint ignore:start */
            patterns : {
                phone     : /^(\+[ ]?)?[0-9]{1,4}[ ]?([0-9]{1,5}|[(][0-9]{1,5}[)])[ ]?[0-9]([\- ]?[0-9]){2,6}[\- ]?[0-9]$/,
                password  : /^[^\s]{6,}$/,
                name      : /^[а-я](\-?[а-я])*\-?[а-я]$/i,
                full_name : /^([а-я](\-?[а-я])*\-?[а-я][ ]){2}[а-я](\-?[а-я])*\-?[а-я]$/i
            },

            live_validate : false
            /* jshint ignore:end */
        }
    });

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
