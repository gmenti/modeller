# Modeller

> Object modeler for node.js

## Installing
``` bash
npm install modeller --save
```

## Getting start

```js
const Modeller = require('modeller');
 
// sync rule
Modeller.register('myRule', (valueReceived, valueOfRule) => {
  return (valueReceived <= valueOfRule);
});
 
// async rule
Modeller.register('myRuleAsync', valueReceived => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (valueReceived >= 18) {
      resolve();
    } else {
      reject();
    }
  }, 150);
}); 
 
const userMold = Modeller.createMold({
  name: 'string',
  age: 'integer|myRule:110|myRuleAsync',
});
  
userMold.test({
  name: 'User name',
  age: 19,
}).then(() => {
  // validated
}).catch((errors) => {
  //
});
 
userMold.test({
  name: 'User name',
  age: 10,
}).then(() => {
  //
}).catch((errors) => {
  // errors = { age: [ 'myRuleAsync' ] }
});
 
userMold.test({
  name: 'User name',
  age: 115,
}).then(() => {
  //
}).catch((errors) => {
  // errors = { age: [ 'myRule', 110 ] }
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
npm run test
```
