# Foundation libsass template

Шаблон для начала работы с Foundation/Sass/Gulp/Requirejs

## Требования

Для работы необходимы

  * [Node.js](http://nodejs.org)
  * [Gulp](http://gulpjs.com/): `[sudo] npm install -g gulp`
  * [Bower](http://bower.io): `[sudo] npm install -g bower`

## Quickstart

```bash
git clone https://github.com/mrpavlikov/kelnik-foundation.git
cd kelnik-foundation
npm install && bower install
```

Перед работой запускаем watcher

`gulp`

## Структура папок

  * `dist/scss/_settings.scss`: Конфигурационный файл Foundation
  * `dist/scss/_settings_common.scss`: Конфигурационный файл наших наработок
  * `dist/scss/_common.scss`: Набор стандартных хаков
  * `dist/scss/app.scss`: Стили приложения
  * `dist/js`: Исходники javascript
