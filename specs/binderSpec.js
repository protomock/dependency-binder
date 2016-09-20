var expect = require('expect.js');
var sinon = require('sinon');

describe('binder', function() {
    var subject;
    beforeEach(function() {
        subject = require('../index.js')({
            'test': {'testme': 'testestest'}
        });
    });
    it('should be created with expected bound', function(done) {
        expect(subject.bound['test'].testme).to.be('testestest');
        done();
    });
    describe('bindAll', function() {
        var actual;
        beforeEach(function() {
            subject.bind = sinon.stub();
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
    });

    describe('bind', function() {
        context('when bind is called with a string', function() {
            context('when module is found', function() {
                beforeEach(function() {
                    subject.bind('something', 'sinon');
                });
                it('should bind the object correctly', function(done) {
                    expect(typeof subject.bound['something']).to.be('object');
                    done();
                });
            });

            context('when module is not found', function() {
                beforeEach(function() {
                    subject.bind('something', 'not-found');
                });
                it('should bind the object correctly', function(done) {
                    expect(subject.bound['something']).to.be('not-found');
                    done();
                });
            });
        });

        context('when bind is called with any other type', function() {
            beforeEach(function() {
                subject.bind('something', sinon.stub());
            });
            it('should bind the object correctly', function(done) {
                expect(subject.bound['something'].isSinonProxy).to.be(true);
                done();
            });
        });
    });

    describe('resolve', function() {
        var actual;
        beforeEach(function() {
            subject.bound['something'] = 'some-other-thing';
            actual = subject.resolve('something');
        });
        it('should call bind the correct times', function(done) {
            expect(actual).to.be('some-other-thing');
            done();
        });
    });
});
