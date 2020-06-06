# redux-boiler [![Build Status](https://travis-ci.org/otherchen/redux-boiler.svg?branch=master)](https://travis-ci.org/otherchen/redux-boiler)
MERN stack + Basic JWT Authentication + Docker + Travis. My name is Andrew Chen.

### Table of Contents
1. [Getting Started](#getting-started)
1. [File Structure](#file-structure)
1. [What's Included](#whats-included)
1. [Testing Utilities](#testing-utilities)
1. [NPM Scripts](#npm-scripts)
1. [Recommendations](#recommendations)
1. [Todo List](#todo-list)

### Getting Started
1. Install Docker. Mac users can download [Docker for Mac](https://www.docker.com/docker-mac) (recommended) or [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_mac/). Windows users can only use [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).

1. Install [npm](https://nodejs.org/en/download/). (Note: npm installation is not actually necessary since the docker image will have its own
Node.js and npm instances. However, I've added some useful shorthand scripts to the package.json, making npm recommended to have. If you don't want to install npm, just directly use the docker commands aliased in the package.json)

1. Clone the project directory.
    ```
    git clone https://github.com/otherchen/redux-boiler.git
    ```

1. Build the docker image. (this runs npm install inside the image and packages all the code into one neat bundle)
    ```
    docker-compose build
    ```

1. Check that unit tests run.
    ```
    npm run compose-tests
    ```

1. Start a docker container in development mode.
    ```
    npm run compose-development
    ```

1. Open [localhost:3000](localhost:3000) to see the starter app.

### File Structure
1. [/client](./client) is where you write all of your react/redux code
2. [/server](./server) is where you write all of your server-side code
3. [/views](./views) is where you write your ejs (where you can include cdn scripts)
4. [/assets](./assets) is where you write your sass and where you place your images
5. [/public](./public) is where the ejs looks for your static files (you shouldn't need to touch this)

##### Important Root Level Files
1. [Dockerfile](./Dockerfile) is used to define how to build your web application's Docker image
2. [docker-compose.yml](./docker-compose.yml) is the base compose file used to instantiate & orchestrate the app's containers
3. [gulpfile.babel.js](./gulpfile.babel.js) is used to create gulp tasks, specifically for building and running the entire app's code
4. [webpack.config.babel.js](./webpack.config.babel.js) is used by webpack (in the gulpfile) to configure the bundling of client-side code
5. [.travis.yml](./.travis.yml) is used by [travis-ci](https://travis-ci.org/) to automate your continuous integration (can be removed)
6. [.editorconfig](./.editorconfig) adheres your code editor to certain settings if the editorconfig plugin is installed (can be removed)

### What's Included

##### Core
1. react
2. mongodb
3. express
4. node.js
5. redux

##### Testing
1. mocha
2. chai
3. sinon
4. enzyme
5. jsdom

##### Important Modules
1. gulp
2. webpack
4. mongoose
7. isomorphic-fetch
8. babel (jsx/es6 support)
9. jsonwebtoken
10. redux-form
11. redux-thunk

##### DevOps
1. docker
2. travis-ci

### Testing Utilities
##### Frontend Stack
1. mocha - runner
2. chai - asserts
3. sinon - stubs
4. enzyme - react components
5. jsdom - headless browser

##### Backend Stack
1. mocha - runner
2. chai - asserts
3. sinon - stubs

##### How to Write Tests
1. all tests should have the extension - `.spec.js` (ex. HelloWorld.spec.js)
2. test files can be placed anywhere but it is recommended to group them in folders with clear intentions (ex. `__test__`)
3. run your tests using `npm run compose-tests`

### NPM Scripts
##### 1. `npm run compose-development`
* starts the app in development mode on port 3000

##### 2. `npm run compose-production`
* starts the app in production mode on port 80

##### 3. `npm run compose-tests`
* runs the tests in development mode so you don't need to rebuild the Docker image each time you test

##### 4. `npm start`
* used by docker to start the server (you shouldn't have to use this)

##### 5. `npm test`
* used by docker to run the tests (you shouldn't have to use this)

### Recommendations
1. Follow Airbnb's [react style guide](https://github.com/airbnb/javascript/tree/master/react) for best practices

### Todo List
1. Replace npm with yarn for faster installs and better memory utilization
2. Add an application level build step in the Dockerfile so that in production, npm start only starts the server
3. Add the [supertest](https://www.npmjs.com/package/supertest) npm module for testing routes (integration tests)
4. Create a Higher Order Component to handle checking the token on page refresh
5. Implement Webpack hot reloading / Webpack dev server
6. Implement Redux Router for Undo/Redo functionality
