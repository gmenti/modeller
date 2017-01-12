# Modelizer

> Object modeler for node.js

## Installing
``` bash
npm install modelizer --save
```

## Getting start

```js
const Modelizer = require('modelizer');
  
Modelizer.register('myRule', (valueReceived, valueOfRule) => {
  return (valueReceived <= valueOfRule);
});
 
const userMold = new Modelizer({
  name: 'string',
  age: 'integer|myRule:10',
});
 
const userToValidate = {
  name: 'User name',
  age: 6,
};
  
userMold.test(userToValidate).then(() => {
  // validated
}).catch((errors) => {
  // errors: { age: myRule:10 }
});
```

## Build Setup

``` bash
# install dependencies
npm install
   
# start application
npm run start
  
# watch lib files and run on change.
npm run watch
  
# run tests
npm run teste
```
