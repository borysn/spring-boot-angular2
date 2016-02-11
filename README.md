# spring-boot-angular2
Spring Boot with Gradle, Angular2, TypeScript, and Sass.

# pre-install
1. install OpenJDK8
1. install ruby with sass gem
1. (optional) install gradle
    - otherwise just use ./gradlew

# install
`git clone git@github.com:borysn/spring-boot-angular2`

# build & run
* `gradle build`
* `gradle npminstall`
    - if install fails at `tsd install`, see issues below
* `gradle grunt_build`
* `gradle bootRun`
* using browser, navigate to`localhost:8080`

# front-end dev
* `gradle grunt_watch`
    - watch html, ts, scss files in `src/main/webwork/` for changes 
    
# issues
1. `gradle grunt_build` fails at `ts:dev`, but the angular2 app still runs successfully.
    - tsc throws errors
        1. `Cannot find module angular2/core`
        2. `Cannot find module angular2/platform/browser`
2. `gradle npminstall` fails at `tsd install`
    - enter the `src/main/webconfig` directory and configure an npm helper script
    - run `./npm install tsd` then re-run `gradle npminstall` from project root dir.

* I have a grunt plugin task that executes the typescript compilation, ts:dev. This task fails, but still compiles the ts correctly, and the angular app runs. If anyone's up for it, I could use some help solving these errors.
