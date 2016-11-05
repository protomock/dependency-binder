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

    describe('softBind', function() {
        var bindStub;
        beforeEach(function() {
            bindStub = sinon.stub(subject, "bind");
        });
        afterEach(function() {
            bindStub.restore();
        });
        context('when object exists in the object graph', function() {
            beforeEach(function() {
                subject.objectGraph = {
                    "already": "exists-in-the-graph"
                };

                subject.softBind("already", "new value");
            });

            it('should not call bind', function() {
                expect(bindStub.called).to.be.false;
            });

            it('should not change the orginal value', function() {
                expect(subject.objectGraph['already']).to.be('exists-in-the-graph');
            });
        });
        context('when object does not exist in the object graph', function() {
            beforeEach(function() {
                subject.softBind("new", "value");
            });

            it('should call bind with the expected arguments', function() {
                expect(bindStub.called).to.be.true;
                expect(bindStub.getCall(0).args[0]).to.be.equal("new");
                expect(bindStub.getCall(0).args[1]).to.be.equal("value");
            });
        });
    });

    describe('softBindAll', function() {
        var actual,
            softBindStub;
        beforeEach(function() {
            softBindStub = sinon.stub(subject, 'softBind');
            actual = subject.softBindAll({
                "object": {},
                "method": function() {
                    return "test";
                }
            });
        });
        it('should call softBind the correct times', function(done) {
            expect(softBindStub.called).to.be(true);
            expect(softBindStub.calledTwice).to.be(true);
            expect(softBindStub.getCall(0).args[0]).to.be("object");
            expect(typeof softBindStub.getCall(0).args[1]).to.be('object');
            expect(softBindStub.getCall(1).args[0]).to.be("method");
            expect(typeof softBindStub.getCall(1).args[1]).to.be('function');
            expect(actual).to.be(subject);
            done();
        });
        afterEach(function() {
            softBindStub.restore();
        });
    });
});
