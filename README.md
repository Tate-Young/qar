# CrewportalQar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.6.

## Development server

Run `npm start` (`ng serve --host 10.88.29.222 --port 8090 -o & gulp watch`) for a dev server. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build production

Run `npm run prod`(`ng build --prod --bh ./ && gulp release`) to build the production project. The build artifacts will be stored in the `dist/` directory. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Night mode

源样式在路径src/libs/images下，雪碧图样式生成路径为src/libs/sprite。
生成的day.min.css和night.min.css供夜间模式切换。
