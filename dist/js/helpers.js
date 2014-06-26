define(['handlebars'], function onPluginsLoaded(Handlebars) {
    'use strict';

    Handlebars.registerHelper('mr', function mr(text) {
        return 'mr. ' + text;
    });

    Handlebars.registerHelper('mrs', function mrs(text) {
        return 'mrs. ' + text;
    });

    return Handlebars;
});
