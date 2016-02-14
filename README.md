# spring-boot-angular2
Spring Boot with Gradle, Angular2, TypeScript, and Sass

## description
a starter project for prototyping restful applications with spring boot and angular2.

## pre-install
1. install OpenJDK8
    - set `JAVA_HOME` environment variable
1. (optional) install gradle 2.9
    - otherwise just use ./gradlew

## install
`git clone git@github.com:borysn/spring-boot-angular2`

## build & run
* `gradle build`
* `gradle npminstall`
* `gradle gulp_build`
* `gradle bootRun`
* using browser, navigate to`localhost:8080`

## front-end dev
* `gradle gulp_watch`
    - watch html, ts, sass files in `src/main/web` for changes

## issues
* `gradle npminstall` fails on windows
    - edit `build.gradle` to change node version
        - find line `version = '5.6.0'`
        - change to `version = '5.0.0'`
