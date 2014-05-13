define(['jquery', 'foundation'], function($) {
	var Form = function(form, opts) {
		this.onSuccess = null;
		this.onError = null;

		this.opts = {
			successTpl: 'form_success',
			errorTpl: 'form_error',
			errorText: 'Внутренняя ошибка, пожалуйста, повторите запрос позднее',
			successText: 'Форма успешно отправлена'
		};

		$.extend(this.opts, opts || {});

		this.form = ('object' === typeof form)
			? form
			: $('#' + form);

		this.submitBtn = this.form.find('[type=submit]');
		this.initModal();
	};

	Form.prototype.initModal = function() {
		var modal = this.form.find('.reveal-modal');
		if (!modal.length) {
			modal = $('<div class="reveal-modal reveal-modal-alt" data-reveal>' +
						'<div class="reveal-modal-inner">' +
							'<div class="js-alert"></div>' +
							'<a class="close-reveal-modal">&#215;</a>' +
						'</div>' +
					'</div>');
			this.form.append(modal);
			modal.foundation('reveal');
		}
		this.modal = modal;
	};

	Form.prototype.init = function() {
		var self = this;

		self.form.on('valid', function() {
			self.send();
		});

		self.form.submit(function() {
			return false;
		});
	};

	Form.prototype.send = function() {
		var self = this;

		self.submitBtn.prop('disabled', true);

		$.ajax({
			url: self.form.attr('action') || location,
			data: self.form.serialize(),
			method: self.form.attr('method') || 'post'
		})
			.done(function(data) {
				var method = data.ret
					? 'handleSuccess'
					: 'handleError';

				self[method](data);
			})
			.fail(function() {
				self.handleError({
					message: self.opts.errorText
				});
			})
			.always(function() {
				self.submitBtn.prop('disabled', false);
			});
	};

	Form.prototype.handleError = function(data) {
		var self = this;

		if (self.onError && ('function' === typeof self.onError)) {
			var ret = self.onError(data);
			if (ret) return;
		}

		require(['templates/' + self.opts.errorTpl], function(tpl) {
			var html = tpl({
				header: 'Ошибка!',
				message: data.message || self.opts.errorText
			});
			self.popup(html);
		});
	};

	Form.prototype.popup = function(html) {
		var self = this;

		self.modal.find('.js-alert').html(html);
		self.modal.foundation('reveal', 'open');
	};

	Form.prototype.handleSuccess = function(data) {
		var self = this;

		if (data.redirect) {
			location.href = data.redirect;
			return;
		}

		if (self.onSuccess && ('function' === typeof self.onSuccess)) {
			var ret = self.onSuccess(data);
			if (ret) return;
		}

		require(['templates/' + self.opts.successTpl], function(tpl) {
			var html = tpl({
				header: 'Спасибо!',
				message: data.message || self.opts.successText
			});
			self.form.replaceWith(html);
		});
	};

	return Form;
});
