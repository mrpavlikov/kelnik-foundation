define('app', [
    'jquery',
    'fastclick',
    'foundation'
], function(
    $,
    FastClick
) {
    'use strict';

    FastClick.attach(document.body);

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

    return {};
});
