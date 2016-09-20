# Dependency-Binder
Helps with tdd in node when it comes to testing required modules

## What does this problem solve
### Implementation

Lets say we want to export a function called test.
In this function we need to require the `do` module and call function something

```javascript
module.exports = {
    test: function() {
        var do = require('do');
        do.something();
    }
};
```

### Spec (Mocha)
If we are writing the test first for the implementation above we need to be
able to test the require statement

```javascript
describe('test', function(){
  var subject;
  beforeEach({
      subject = require('module-from-above');
      subject.test();
  });

  it('should do something', function(){ }); //<- problem... how do check that something was called on do?
});
```

We would need to use a stub for the something function but how do we make it a stub?
This is where using dependency-binder comes in!


## Setup
Install the package:
`npm install dependency-binder`

Once installed, its not too complicated to setup. Paste something like the below code into the top of your js file:

```javascript
var binder = require('dependency-binder')({
    'do': require('do') //<- you can make the key anything!
});

//rest of your code
```

You can also bind a module you do not yet have:

```javascript
var binder = require('dependency-binder')({
    'module': 'module-that-doesnt-exist' //<-- it's being bound as a string
});

//rest of your code
```

If you bind a string value it will attempt to require the module, if none exists
it will return the string it's self.

Next, the binder instance needs to be exposed through the module exports.

From the implementation above:
```javascript
module.exports = {
    binder: binder, //<----
    test: function() {
        var do = require('do');
        do.something();
    }
};
```

Then anywhere you call `require` in the same file, switch to `binder.resolve('module-name')`.

Now in you spec you can change out the binding and replace it with whatever you need.

From the Spec above:

```javascript
describe('test', function(){
  var subject
      somethingStub;

  beforeEach({
      subject = require('module-from-above');
      somethingStub = sinon.stub();
      var do = {
          something: somethingStub
      };
      subject.binder.bind('do', do);
      subject.test();
  });

});
```

and now your expectation can look something like this

```javascript
it('should call createServer', function(done) {
      expect(somethingStub.called).to.be.equal(true);
      done();
});
```

## Functions

###bindAll
```javascript
  binder.bindAll({'name','value'}) //can add update multiple binders at once in the binder
```

###bind
```javascript
  binder.bind('name','value') //adds updates the binding in your binder
```

###resolve
```javascript
  binder.resolve('name') //returns the value for the name passed in. If none exists, returns null
```
