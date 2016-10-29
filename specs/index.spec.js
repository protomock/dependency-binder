var expect = require('expect.js');
var sinon = require('sinon');

describe('index', function() {
    var subject;
    beforeEach(function() {
        subject = require('../index.js');
    });

    context('when global.binder is defined', function() {
        context('when a config is provided', function() {
            beforeEach(function() {
                global.binder = {};
                global.binder.bindAll = sinon.stub();

                subject({
                    test: 'test-module'
                });
            });

            it('should call bindAll with the correct values', function() {
                expect(global.binder.bindAll.called).to.be(true);
                expect(global.binder.bindAll.getCall(0).args[0].test).to.be('test-module');
            });
        });
        context('when a config is not provided', function() {
            var actual;
            beforeEach(function() {
                global.binder = {};
                global.binder.bindAll = sinon.stub();

                actual = subject();
            });

            it('should not call bindAll', function() {
                expect(global.binder.bindAll.called).to.be(false);
            });
            it('should return autowire function', function() {
                expect(typeof actual).to.be('object');
            });
        });
    });
});
