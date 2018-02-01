# Example Project

## Getting Started

### Running the application

* Type `npm install` into terminal and press enter.
* Make sure `typescript` is globally installed on your machine.
* Make sure you have a valid connection string to a MongoDB instance in the `config.ts` file.
* Type `npm start` into terminal and press enter.
* Browse to `http://localhost:3000/api/docs` to view the Swagger documentation.

### Running the unit tests

* Type `npm install` into terminal and press enter.
* Make sure `typescript` is globally installed on your machine.
* Make sure `mocha` is globally installed on your machine.
* Type `npm test` into terminal and press enter.

### Running the code coverage

* Type `npm install` into terminal and press enter.
* Make sure `typescript` is globally installed on your machine.
* Make sure `istanbul` is globally installed on your machine.
* Type `npm run coverage` into terminal and press enter.

##  Additional Requirements

* Customers are unique by Identification Number.
* Customers are South African citizens as there is no field for Passport Number.

## Unit Test Results

```
CustomerMapper
    map
      √ should map to correct type
      √ should map contact information to correct type
      √ should map contact information address to correct type
      √ should map contact information email address
      √ should map first name
      √ should map identification number

CustomerService
    create
      √ should throw exception given invalid customer
      √ should not throw exception given valid customer
      √ should call create in repository given valid customer
      √ should not call create in repository given invalid customer
      √ should throw exception given identification number already exists
      √ should not call create in repository given identification number already exists
    find
      √ should throw exception given null id
      √ should not throw exception given valid customer id
      √ should call find in repository given valid customer id
      √ should not call find in repository given invalid customer id
    search
      √ should throw exception given null query
      √ should not throw exception given valid query
      √ should call search in repository given valid query
      √ should not call search in repository given invalid query


20 passing (29ms)
```

## Code Coverage Results

```
Statements   : 85.47% ( 253/296 )
Branches     : 47.5% ( 38/80 )
Functions    : 72.6% ( 53/73 )
Lines        : 87.5% ( 217/248 )
```