[![Build Status](https://travis-ci.org/borysn/spring-boot-angular2.svg?branch=master)](https://travis-ci.org/borysn/spring-boot-angular2)
[![Gitter](https://badges.gitter.im/borysn/spring-boot-angular2.svg)](https://gitter.im/borysn/spring-boot-angular2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![bitHound Dependencies](https://www.bithound.io/github/borysn/spring-boot-angular2/badges/dependencies.svg)](https://www.bithound.io/github/borysn/spring-boot-angular2/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/borysn/spring-boot-angular2/badges/devDependencies.svg)](https://www.bithound.io/github/borysn/spring-boot-angular2/master/dependencies/npm)

# upcoming changes 

* [sba2-wip repo](https://gitlab.com/borysn/sba2-wip)

Changes coming later today! Large commit (no regrets).

Migration to webpack is complete.

Karma testing with jasmine.

Firstclass npm support, and more!

__todo:__
- [ ] create new branch for old code (just'n'case anyone wants it)
- [ ] publish first release with old code
- [ ] push new changes!
- [ ] create changelog
- [ ] update readme
- [ ] wiki updates
    -  [ ]  add project structure page
    -  [ ]  update dependencies page
    -  [ ]  backend run vs frontend run
    -  [ ]  backend dev vs frontend dev
    -  [ ]  update config page
    
# spring-boot-angular2 starter kit

Spring Boot with Angular2, Bootstrap4, TypeScript, Sass, Gradle, and Gulp.

## about

a starter project for prototyping restful applications with spring boot, angular2, and bootstrap4.

anuglar2 with es6 support. unit tests with jasmine.

## pre-install

1. install OpenJDK8
    - set `JAVA_HOME` environment variable
1. (optional) install latest gradle
    - otherwise just use `$ ./gradlew`
1. (optional) install python 2.7.x
    - set `PYTHON` environment variable
    - `$ gradle npminstall` may complain otherwise

## install

`$ git clone git@github.com:borysn/spring-boot-angular2`

## build & run

* `$ gradle clean build`
* `$ gradle bootRun`
* using browser, navigate to`localhost:8080`

## further reading

[wiki](https://github.com/borysn/spring-boot-angular2/wiki)

## example

check out my [RVEP](https://gitlab.com/borysn/RVEP/tree/dev) project. it's built and updated according to this starter kit!

## contribute

if you have any input, or contributions, please share!

## donations
[donate](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=4NPQ49B5NRV3E&lc=US&item_name=Borys%20Niewiadomski&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted) a cup of coffe

## license
[MIT](/LICENSE)
