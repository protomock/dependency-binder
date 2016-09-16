var expect = require('expect.js');
var sinon = require('sinon');

describe('binder', function(){
    var subject;
    beforeEach(function(){
        subject = require('../index.js')({'test':'testestest'});
    });
    it('should be created with expected bound', function(done) {
        expect(subject.bound['test']).to.be('testestest');
        done();
    });
    describe('bindAll', function() {
        var actual;
        beforeEach(function(){
            subject.bind = sinon.stub();
            actual = subject.bindAll({
                "object" : {},
                "method" : function(){return "test";}
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
        beforeEach(function(){
            subject.bind('something','some-other-thing');
        });
        it('should bind the object correctly', function(done){
            expect(subject.bound['something']).to.be('some-other-thing');
            done();
        });
    });

    describe('resolve', function() {
        var actual;
        beforeEach(function(){
            subject.bound['something'] = 'some-other-thing';
            actual = subject.resolve('something');
        });
        it('should call bind the correct times', function(done){
            expect(actual).to.be('some-other-thing');
            done();
        });
    });
});
