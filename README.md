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

  * `dist/scss/_settings.scss`: Конфигурационный файл Foundation (следует после установки скопировать оригинал из www/js)
  * `dist/scss/_common.scss`: Набор стандартных хаков
  * `dist/scss/app.scss`: Стили приложения
  * `dist/js`: Исходники javascript
  * `dist/templates`: Исходники шаблонов Handlebars
