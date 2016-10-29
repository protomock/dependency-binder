var expect = require('expect.js');
var sinon = require('sinon');
var binder = require('../binder.js');

describe('subject', function() {
    var subject;
    before(function() {
        subject = new binder();
    });
    describe('bindAll', function() {
        var actual;
        beforeEach(function() {
            sinon.spy(subject, 'bind');
            actual = subject.bindAll({
                "object": {},
                "method": function() {
                    return "test";
                }
            });
        });
        it('should call bind the correct times', function(done) {
            expect(subject.bind.called).to.be(true);
            expect(subject.bind.calledTwice).to.be(true);
            expect(subject.bind.getCall(0).args[0]).to.be("object");
            expect(typeof subject.bind.getCall(0).args[1]).to.be('object');
            expect(subject.bind.getCall(1).args[0]).to.be("method");
            expect(typeof subject.bind.getCall(1).args[1]).to.be('function');
            expect(actual).to.be(subject);
            done();
        });
        afterEach(function() {
            subject.bind.restore();
        });
    });

    describe('bind', function() {
        var resolverStub;
        context('when bind is called with a string', function() {
            beforeEach(function() {
                resolverStub = sinon.stub(subject.resolver, 'resolveModule');
                resolverStub.returns('resolved-module');
                subject.bind('module', 'unresolved-module');
            });
            it('should bind the object correctly', function(done) {
                expect(subject.objectGraph['module']).to.be('resolved-module');
                done();
            });
        });

        context('when bind is called with any other type', function() {
            beforeEach(function() {
                subject.bind('module', sinon.stub());
            });
            it('should bind the object correctly', function(done) {
                expect(subject.objectGraph['module'].isSinonProxy).to.be(true);
                done();
            });
        });
    });

    describe('resolve', function() {
        var actual;
        beforeEach(function() {
            subject.objectGraph['something'] = 'some-other-thing';
            actual = subject.resolve('something');
        });
        it('should call bind the correct times', function(done) {
            expect(actual).to.be('some-other-thing');
            done();
        });
    });

    describe('reset', function() {
        beforeEach(function() {
            subject.objectGraph = {
                "will-be": "gone"
            };
            subject.reset();
        });

        it('should reset out the current objectgraph', function() {
            expect(subject.objectGraph['will-be']).to.be(undefined);
        });
    });
});
