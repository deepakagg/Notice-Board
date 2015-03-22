##Node.js Notice Board Server
*****


This repository contains code of the backend server for notice board service.


###Dependencies
1. Node.js
2. Mongodb

### Setting up server
1. Install all the dependencies mentioned above
2. Run `npm install` for installing all the node modules required by the app
3. It will be a good idea to run `make test` which will run all the test cases

### Testing Server
All the test cases are present inside the test.js file in their corresponding folders inside Application folder.

For running all the test type `make test` on the terminal

1. Run all the test cases
2. Clear/Reset the test database after exit automatically

##### Running Tests

```sh
$ make test
```

If you just want to run test via a single module, please you do:

```sh
$ make test module={your module name}
```
