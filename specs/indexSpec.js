var expect = require('expect.js');
var sinon = require('sinon');

describe('index', function() {
    var subject;
    beforeEach(function() {
        subject = require('../index.js');
    });

    context('when global.binder is defined', function() {
        beforeEach(function() {
            global.binder = {};
            global.binder.bindAll = sinon.stub();

            subject({
                test: 'test-module'
            });
        });

        it('should call bindAll with the correct values', function(){
              expect(global.binder.bindAll.called).to.be(true);
              expect(global.binder.bindAll.getCall(0).args[0].test).to.be('test-module');
        });
    });
});
