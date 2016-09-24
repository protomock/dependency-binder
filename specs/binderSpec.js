var expect = require('expect.js');
var sinon = require('sinon');

describe('binder', function() {
    before(function() {
        require('../index.js')({
            'test': {
                'testme': 'testestest'
            }
        });
    });
    it('should be created with expected objectGraph', function(done) {
        expect(binder.objectGraph['test'].testme).to.be('testestest');
        done();
    });
    describe('bindAll', function() {
        var actual;
        beforeEach(function() {
            sinon.spy(binder,'bind');
            actual = binder.bindAll({
                "object": {},
                "method": function() {
                    return "test";
                }
            });
        });
        it('should call bind the correct times', function(done) {
            expect(binder.bind.called).to.be(true);
            expect(binder.bind.calledTwice).to.be(true);
            expect(binder.bind.getCall(0).args[0]).to.be("object");
            expect(typeof binder.bind.getCall(0).args[1]).to.be('object');
            expect(binder.bind.getCall(1).args[0]).to.be("method");
            expect(typeof binder.bind.getCall(1).args[1]).to.be('function');
            expect(actual).to.be(binder);
            done();
        });
        afterEach(function(){
            binder.bind.restore();
        });
    });

    describe('bind', function() {
        var resolverStub;
        context('when bind is called with a string', function() {
            beforeEach(function() {
                resolverStub = sinon.stub(binder.resolver, 'resolveModule');
                resolverStub.returns('resolved-module');
                binder.bind('module', 'unresolved-module');
            });
            it('should bind the object correctly', function(done) {
                expect(binder.objectGraph['module']).to.be('resolved-module');
                done();
            });
        });

        context('when bind is called with any other type', function() {
            beforeEach(function() {
                binder.bind('module', sinon.stub());
            });
            it('should bind the object correctly', function(done) {
                expect(binder.objectGraph['module'].isSinonProxy).to.be(true);
                done();
            });
        });
    });

    describe('resolve', function() {
        var actual;
        beforeEach(function() {
            binder.objectGraph['something'] = 'some-other-thing';
            actual = binder.resolve('something');
        });
        it('should call bind the correct times', function(done) {
            expect(actual).to.be('some-other-thing');
            done();
        });
    });
});
