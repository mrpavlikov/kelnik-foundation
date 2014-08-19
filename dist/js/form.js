define(['jquery', 'foundation'], function formModule($) {
    'use strict';

    /**
     * Класс форм
     * @param {Object|String} form объект jQuery или строка-селектор
     * @param {Object|Void}   opts объект параметров
     */
    var Form = function(form, opts) {
        this.onSuccess = null;
        this.onError   = null;

        this.opts = {
            successTpl : 'form_success',
            errorTpl   : 'form_error',
            popupTpl   : 'form_popup',
            errorText  : 'Внутренняя ошибка, пожалуйста, ' +
                         'повторите запрос позднее',
            successText: 'Форма успешно отправлена'
        };

        $.extend(this.opts, opts || {});

        this.form = ('object' === typeof form) ?
                    form :
                    $('#' + form);

        this.submitBtn = this.form.find('[type=submit]');
    };

    /**
     * Отменяет обычный submit формы, на событии valid осуществляет свой submit
     */
    Form.prototype.init = function() {
        var self = this;

        self.form.on('valid.fndtn.abide', function send() {
            self.send();
        });

        self.form.submit(function preventDefault(e) {
            e.preventDefault();
        });
    };

    /**
     * Отправка формы и обработчик ответа от сервера
     */
    Form.prototype.send = function() {
        var self = this;

        self.submitBtn.prop('disabled', true);
        $(':focus').blur();

        $.ajax({
            url     : self.form.attr('action') || location,
            data    : self.form.serialize(),
            type    : self.form.attr('method') || 'post',
            dataType: 'json'
        }).always(function always() {
            self.submitBtn.prop('disabled', false);
        }).done(function onDone(data) {
            var method = data.ret ? 'handleSuccess' : 'handleError';
            self[method](data);
        }).fail(function onFail() {
            self.handleError({
                message: self.opts.errorText
            });
        });
    };

    /**
     * Обработчик ошибки ответа
     * @param  {Object|undefined} data ответ сервера, если был, или undefined
     */
    Form.prototype.handleError = function(data) {
        var self = this;

        /**
         * Если в параметры конструктора был передан callback - вызываем.
         * Если при этом callback вернет true, то стандартный обработчик
         * будет отменен
         */
        if ('function' === typeof self.onError) {
            var ret = self.onError(data);
            if (ret) {
                return;
            }
        }

        require([
            'templates/' + self.opts.errorTpl
        ], function onErrorTplLoaded(tpl) {
            var html = tpl({
                header : 'Ошибка!',
                message: data.message || self.opts.errorText
            });
            self.popup(html);
        });
    };

    /**
     * Обработчик положительного ответа сервера
     * @param  {Object} data ответ сервера
     */
    Form.prototype.handleSuccess = function(data) {
        var self = this;

        if (data.redirect) {
            location.href = data.redirect;
            return;
        }

        if ('function' === typeof self.onSuccess) {
            var ret = self.onSuccess(data);
            if (ret) {
                return;
            }
        }

        require([
            'templates/' + self.opts.successTpl
        ], function onSuccessTplLoaded(tpl) {
            var html = tpl({
                header : 'Спасибо!',
                message: data.message || self.opts.successText
            });
            self.form.replaceWith(html);
        });
    };

  /**
     * Открытие попапа
     * @param  {String} html содержимое попапа
     */
    Form.prototype.popup = function(html) {
        var self = this;
        var reveal = function() {
            self.modal.find('.js-alert').html(html);
            self.modal.foundation('reveal', 'open');
        };

        if (self.modal) {
            reveal();
            return;
        }

        require([
            'templates/' + self.opts.popupTpl
        ], function onPopupTplLoaded(tpl) {
            self.modal = $(tpl());
            self.modal.appendTo(self.form)
                      .foundation('reveal');
            reveal();
        });
    };

    return Form;
});
