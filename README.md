# Kelnik Foundation Template

Шаблон для начала работы с Foundation

## Требования

Для работы необходимы

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com/): `[sudo] npm install -g gulp`
* [Bower](http://bower.io): `[sudo] npm install -g bower`
* [Jscs](https://github.com/mdevils/node-jscs): `[sudo] npm install jscs -g`
* [Jshint](https://github.com/jshint/jshint/): `[sudo] npm install jshint -g`
* [Ruby](https://www.ruby-lang.org/ru/downloads/)
* [Compass](http://compass-style.org/): `[sudo] gem install compass`
* [Scss-lint](https://github.com/causes/scss-lint): `[sudo] gem install scss-lint`

## Quickstart

```bash
git clone git@github.com:mrpavlikov/kelnik-foundation.git <project-name>
cd <project-name>
npm install && bower install && gulp build
```

## Структура папок

Скрипты, шаблоны и стили хранятся внутри папки `dist`:

* `styles`
    * `/_settings.scss` : Конфигурационный файл Foundation
    (следует после установки скопировать оригинал из www/scripts/lib/foundation/scss/foundation/_settings.scss)
* `scripts`
    * `app.js` : точка входа
    * `config.js` : настройки RequireJS
    * `/app` : здесь должны храниться все прочие скрипты
    * `/tpl` : шаблоны Handlebars

Для подключения скриптов сайта нужно использовать префикс `app/`, например:

```js
require(['app/form', 'app/map'], function(Form, map) {
    // do stuff
});
```

Подключение шаблонов с префиксом `tpl/`:

```js
require(['tpl/form/error'], function(tpl) {
   // do stuff
});
```

Сторонние библиотеки, установленные через bower, находятся в папке
`www/scripts/lib`. При добавлении их в config.js префикс `lib/` не требуется.
