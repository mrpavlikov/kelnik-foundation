define(['jquery', 'foundation'], function application($) {
    'use strict';

    // Инициализация фреймворка Foundation
    /* jshint ignore:start */
    $(document).foundation({
        abide: {
            patterns: {
                phone    : /^(\+[ ]?)?[0-9]{1,4}[ ]?([0-9]{1,5}|[(][0-9]{1,5}[)])[ ]?[0-9]([\- ]?[0-9]){2,6}[\- ]?[0-9]$/,
                password : /^[^\s]{6,}$/,
                name     : /^[а-я](\-?[а-я])*\-?[а-я]$/i,
                full_name: /^([а-я](\-?[а-я])*\-?[а-я][ ]){2}[а-я](\-?[а-я])*\-?[а-я]$/i
            },
            live_validate: false
        }
    });
    /* jshint ignore:end */

    (function initForms(forms) {
        if (!forms.length) { return; }

        require(['form'], function onFormLoaded(Form) {
            var init = function() {
                var form = new Form($(this));
/*
                form.onSuccess = function(data) {
                    alert('Custom on success');
                    console.log(data);
                    return true; // чтобы отменить стандартный обработчик
                };

                form.onError = function(data) {
                    alert('Custom on error');
                    console.log(data);
                    return true; // чтобы отменить стандартный обработчик
                };
*/
                form.init();
            };

            forms.each(init);
        });
    })($('form'));


    // Подключение плагина Fotorama
    (function initFotorama(list) {
        if (!list.length) { return; }

        var fotorama = function() {
            $(this).fotorama({});
        };

        require(['fotorama'], function onFotoramaLoaded() {
            list.each(fotorama);
        });

    })($('.fotorama'));

    // Подключение Яндекс карт
    (function initYmaps(cont) {
        if (!cont) { return; }

        require(['ymaps'], function onMapsLoaded(ymaps) {
            var map;
            var initMap = function() {
                map = new ymaps.Map(cont.id, {
                    center: [60.153151, 30.286574],
                    zoom  : 13
                });
            };
            ymaps.ready(initMap);
        });
    })(document.querySelector('#map'));

    // Пример работы с шаблонами
    require(['templates/hello', 'helpers'], function onTplLoaded(template) {
        console.log(template({
            name: 'Pavlikov'
        }));
    });

    return {};
});
