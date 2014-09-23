/**
 * Класс работы с аяксовыми формами
 * @class Form
 */

/**
 * Example :
 * <code>
 * require(['app/form'], function onFormLoaded(Form) {
 *     var init = function() {
 *         var form = new Form($(this));
 *
 *         form.onSuccess = function(data) {
 *             alert('Custom on success');
 *             console.log(data);
 *             return true; // чтобы отменить стандартный обработчик
 *         };
 *
 *         form.onError = function(data) {
 *             alert('Custom on error');
 *             console.log(data);
 *             return true; // чтобы отменить стандартный обработчик
 *         };
 *
 *         form.init();
 *     };
 *
 *     forms.each(init);
 * })($('form'));
 * </code>
 */

define('app/form', [
    'jquery',
    'foundation'
], function(
    $
) {
    'use strict';

    /**
     * @constructor
     * @param {Object|String} $form объект jQuery или строка-селектор
     * @param {Object|Void}   opts  объект параметров
     */
    var Form = function($form, opts) {
        this.onSuccess = null;
        this.onError   = null;

        this.opts = {
            successTpl  : 'form/success',
            errorTpl    : 'form/error',
            popupTpl    : 'form/popup',
            errorText   : 'Внутренняя ошибка, пожалуйста, ' +
                          'повторите запрос позднее',
            successText : 'Форма успешно отправлена'
        };

        $.extend(this.opts, opts || {});

        this.$el = ($form instanceof $) ?
                   $form :
                   $($form);

        this.$submit = this.$el.find('[type=submit]');
    };

    /**
     * Отменяет обычный submit формы, на событии valid осуществляет свой submit
     */
    Form.prototype.init = function() {
        var form = this;

        form.$el.on('valid.fndtn.abide', function send() {
            form.send();
        });

        form.$el.submit(function preventDefault(e) {
            e.preventDefault();
        });
    };

    /**
     * Отправка формы и обработчик ответа от сервера
     */
    Form.prototype.send = function() {
        var form = this;

        $(':focus').blur();
        form.$submit.prop('disabled', true);

        $.ajax({
            url      : form.$el.attr('action') || location,
            data     : form.$el.serialize(),
            type     : form.$el.attr('method') || 'post',
            dataType : 'json'
        }).always(function always() {
            form.$submit.prop('disabled', false);
        }).done(function done(data) {
            var method = data.ret ?
                         'handleSuccess' :
                         'handleError';
            form[method](data);
        }).fail(function fail() {
            form.handleError({
                message : form.opts.errorText
            });
        });
    };

    /**
     * Обработчик ошибки ответа
     * @param  {Object|undefined} data ответ сервера, если был, или undefined
     */
    Form.prototype.handleError = function(data) {
        var form = this;

        /**
         * Если в параметры конструктора был передан callback - вызываем.
         * Если при этом callback вернет true, то стандартный обработчик
         * будет отменен
         */
        if ('function' === typeof form.onError) {
            var ret = form.onError(data);
            if (ret) {
                return;
            }
        }

        require([
            'templates/' + form.opts.errorTpl
        ], function onErrorTplLoaded(tpl) {
            var html = tpl({
                header  : 'Ошибка!',
                message : data.message || form.opts.errorText
            });
            form.popup(html);
        });
    };

    /**
     * Обработчик положительного ответа сервера
     * @param  {Object} data ответ сервера
     */
    Form.prototype.handleSuccess = function(data) {
        var form = this;

        if (data.redirect) {
            location.href = data.redirect;
            return;
        }

        if ('function' === typeof form.onSuccess) {
            var ret = form.onSuccess(data);
            if (ret) {
                return;
            }
        }

        require([
            'templates/' + form.opts.successTpl
        ], function onSuccessTplLoaded(tpl) {
            var html = tpl({
                header  : 'Спасибо!',
                message : data.message || form.opts.successText
            });
            form.$el.replaceWith(html);
        });
    };

    /**
     * Открытие попапа
     * @param  {String} html содержимое попапа
     */
    Form.prototype.popup = function(html) {
        var form = this;

        var reveal = function() {
            form.modal.find('.js-alert').html(html);
            form.modal.foundation('reveal', 'open');
        };

        if (form.modal) {
            reveal();
            return;
        }

        require([
            'templates/' + form.opts.popupTpl
        ], function onPopupTplLoaded(tpl) {
            form.modal = $(tpl());
            form.modal.appendTo(form.$el)
                      .foundation('reveal');
            reveal();
        });
    };

    return Form;
});
