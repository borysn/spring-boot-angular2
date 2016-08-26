[![build status](https://travis-ci.org/borysn/spring-boot-angular2.svg?branch=master)](https://travis-ci.org/borysn/spring-boot-angular2)
[![gitter](https://badges.gitter.im/borysn/spring-boot-angular2.svg)](https://gitter.im/borysn/spring-boot-angular2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![bithound dependencies](https://www.bithound.io/github/borysn/spring-boot-angular2/badges/dependencies.svg)](https://www.bithound.io/github/borysn/spring-boot-angular2/master/dependencies/npm)
[![bithound dev dependencies](https://www.bithound.io/github/borysn/spring-boot-angular2/badges/devdependencies.svg)](https://www.bithound.io/github/borysn/spring-boot-angular2/master/dependencies/npm)

## [change log](https://github.com/borysn/spring-boot-angular2/blob/master/CHANGELOG.md)

## todo
- [x] create new branch for old code (just'n'case anyone wants it)
- [x] publish first release with old code
- [x] push new changes!
- [x] create changelog
- [x] update readme
- [ ] wiki updates
    -  [ ]  add project structure page
    -  [ ]  update dependencies page
    -  [ ]  backend run vs frontend run
    -  [ ]  backend dev vs frontend dev
    -  [ ]  update config page
    
# spring-boot-angular2 starter kit

spring boot backend, angular2 frontend with webpack, typescript, sass, bootstrap4, karma, jasmine

## about

a starter project for prototyping restful applications with spring boot, angular2, and bootstrap4.

anuglar2 with es6 support. unit tests with jasmine.

## pre-install

1. install jdk8
    - set `JAVA_HOME` environment variable
1. (optional) install latest gradle
    - otherwise just use `$ ./gradlew`
1. (optional) install python 2.7.x
    - set `python` environment variable
    - `$ gradle npmInstall` may complain otherwise

## install

`$ git clone git@github.com:borysn/spring-boot-angular2`

## build & run

* `$ gradle clean build runAll`
    - server side will finish building first
    - give npm/webpack a little time to finish up
* using browser, navigate to`localhost:3000`

## further reading

[wiki](https://github.com/borysn/spring-boot-angular2/wiki)

## example

check out my [rvep](https://gitlab.com/borysn/rvep/tree/dev) project. it's built and updated according to this starter kit!

## contribute

if you have any input, or contributions, please share!

## donations
[donate](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=4npq49b5nrv3e&lc=us&item_name=borys%20niewiadomski&currency_code=usd&bn=pp%2ddonationsbf%3abtn_donate_lg%2egif%3anonhosted) a cup of coffe

## license
[mit](/license)
