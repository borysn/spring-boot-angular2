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
    - these errors can be resolved by moving the `src/main/webconfig/node_modules` directory to `src/main/webcwork/...`
        - Though it's a solution, it's not the approach I have in mind. Should be resolvable through configuration.
