# Kelnik Foundation Template

Шаблон для начала работы с Foundation

## Требования

Для работы необходимы

  * [Node.js](http://nodejs.org)
  * [Gulp](http://gulpjs.com/): `[sudo] npm install -g gulp`
  * [Bower](http://bower.io): `[sudo] npm install -g bower`
  * [Ruby](https://www.ruby-lang.org/ru/downloads/)
  * [Compass](http://compass-style.org/): `[sudo] gem install compass --pre`
  * [Scss-lint](https://github.com/causes/scss-lint): `[sudo] gem install scss-lint`

## Quickstart

```bash
git clone https://github.com/mrpavlikov/kelnik-foundation.git <project-name>
cd <project-name>
npm install
gulp
```

## Структура папок

  * `dist/scss/_settings.scss`: Конфигурационный файл Foundation (следует после установки скопировать оригинал из www/js)
  * `dist/scss/_common.scss`: Набор стандартных хаков
  * `dist/scss/app.scss`: Стили приложения
  * `dist/js`: Исходники javascript
  * `dist/templates`: Исходники шаблонов Handlebars
