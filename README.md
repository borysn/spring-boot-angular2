# spring-boot-angular2
Spring Boot with Angular2, TypeScript, and Sass.

Gradle build system.

# pre isntall
1. install ruby with sass gem
2. (optional) install gradle
    - otherwise just use ./gradlew

# install
`git clone git@github.com:borysn/spring-boot-angular2`

# build & run
* `gradle build`
* `gradle npminstall`
* `gradle grunt_build`
* `gradle bootRun`

# front-end dev
* `gradle grunt_watch`
    - watch html, ts, sass files in `src/main/webwork/` for changes 
    
# issues
1. 'gradle grunt_build` fails at `ts:dev`
    - tsc throws errors
        1. `Cannot find module angular2/core`
        2. `Cannot find module angular2/platform/browser`
    - angular2 app still runs successfully.

* I have a grunt plugin task that executes the typescript compilation, ts:dev. This task fails, but still compiles the ts correctly, and the angular app runs. If anyone's up for it, I could use some help solving these errors.
