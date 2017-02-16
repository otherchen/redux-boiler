# redux-boiler
MERN stack + Redux boilerplate with all of the essentials built in.

### Table of Contents
1. [Getting Started](#table-of-contents)
2. [What's Included](#whats-included)
3. [File Structure](#file-structure)
4. [Testing Utilities](#testing-utilities)
5. [NPM Scripts](#npm-scripts)
6. [Recommendations](#recommendations)
 
### Getting Started
1. install [Node.js](https://nodejs.org/en/download/) (comes with npm)

1. copy the project directory
  ```
  git clone https://github.com/otherchen/redux-boiler.git
  ```

1. install all dependencies
  ```
  npm install
  ```

1. install mongodb from their [website](https://docs.mongodb.com/manual/installation/) or if you have homebrew: 
  ```brew install mongodb```

1. create a directory for mongo to live in
  ```
  mkdir -p /data/db
  ```

1. make sure the directory has the correct permissions
  ```
  chmod 0755 /data/db && sudo chown $USER /data/db
  ```

1. start up mongo with:
  ```
  mongod --dbpath <path to data directory>
  ```

1. create a mongo database
  ```
  mongo
  use sampledb
  ```

1. add your new database configeration to [config.js](./config.js)

1. start the node server
  ```
  npm start
  ```

1. check that tests run
  ```
  npm test
  ```

1. open [localhost:3000](localhost:3000) to see the starter app


### File Structure
1. [/client](./client) is where you write all of your react/redux code
2. [/server](./server) is where you write all of your server-side code
3. [/views](./views) is where you write your ejs (where you can include cdn scripts)
4. [/assets](./assets) is where you write your sass and where you place your images
5. [/public](./public) is where the ejs looks for your static files (you shouldn't need to touch this)

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
3. nodemon
4. mongoose
5. lodash
6. bcryptjs
7. isomorphic-fetch
8. babel (jsx/es6 support)
9. jsonwebtoken
10. redux-form
11. redux-thunk

### Testing Utilities
##### Frontend Stack
1. mocha - runner
2. chai - asserts
3. sinon - spies
4. enzyme - react components
5. jsdom - headless browser

##### Backend Stack
1. mocha - runner
2. chai - asserts
3. sinon - spies

##### How to Write Tests
1. all tests should have the extension - `.spec.js` (ex. HelloWorld.spec.js)
2. test files can be placed anywhere but it is recommended to group them in folders with clear intentions (ex. `__test__`)
2. run your tests using `npm test`

### NPM Scripts
1. `npm start` starts the node server
2. `npm test` runs the mocha tests

### Recommendations
1. follow airbnb's [react style guide](https://github.com/airbnb/javascript/tree/master/react) for best practices
2. add the [supertest](https://www.npmjs.com/package/supertest) npm module for testing routes

### Todo List
1. Create a Higher Order Component to handle checking the token on page refresh
2. Implement Webpack hot reloading / Webpack dev server
3. Implement Redux Router for Redo/Undo functionality
