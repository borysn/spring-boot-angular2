# spring-boot-angular2
Spring Boot with Angular2, TypeScript, and Sass.

Gradle build system.

# install

***Must have ruby installed with sass gem prior**

`git clone git@github.com:borysn/spring-boot-angular2`

# build & run
* `gradle build`
* `gradle npminstall`
* `gradle grunt_build`
* `gradle bootRun`

# issues
1. Gradle build fails at `ts:dev`
    - tsc throws errors
        1. `Cannot find module angular2/core`
        2. `Cannot find module angular2/platform/browser`
    - angular2 app still runs successfully.