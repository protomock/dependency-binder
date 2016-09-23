var expect = require('expect.js');
var sinon = require('sinon');

describe('resolver', function() {
    var subject;
    beforeEach(function() {
        delete require.cache[require.resolve('../resolver')];
        subject = require('../resolver');
    });

    describe('resolverModule', function() {
        var actual,
            resolvePathStub;
        beforeEach(function() {
            resolvePathStub = resolvePathStub == null ? sinon.stub(subject, 'resolvePath') : resolvePathStub;
        });

        context('when requiring the path is successful', function() {
            beforeEach(function() {
                resolvePathStub.returns('sinon');
                actual = subject.resolveModule('sinon');

            });
            it('should call resolvePath', function(done) {
                expect(resolvePathStub.called).to.be(true);
                expect(resolvePathStub.getCall(0).args[0]).to.be('sinon');
                expect(typeof resolvePathStub.getCall(0).args[1]).to.be('string');
                done();
            });
            it('should return the required module', function(done) {
                expect(typeof actual).to.be('object');
                done();
            });
        });

        context('when requiring the path is not successful', function() {
            beforeEach(function() {
                resolvePathStub.returns('some-module');
                actual = subject.resolveModule('some-module');
            });
            it('should call resolvePath', function() {
                expect(resolvePathStub.called).to.be(true);
            });

            it('should return the string of the module', function(done) {
                expect(actual).to.be('some-module');
                done();
            });
        });
    });

    describe('resolvePath', function() {
        var actual;
        context('when path contains ./', function() {
            context('and just node_modules', function() {
                beforeEach(function() {
                    actual = subject.resolvePath('./some-file', '/Users/mjr/node_modules/test/bin');
                });

                it('should return the correct path', function(done) {
                    expect(actual).to.be('/Users/mjr/some-file')
                    done();
                });
            });
            context('and both submodule', function() {
                beforeEach(function() {
                    actual = subject.resolvePath('./some-file', '/Users/mjr/submodules/test/bin');
                });

                it('should return the correct path', function(done) {
                    expect(actual).to.be('/Users/mjr/some-file')
                    done();
                });
            });
        });
    });
});
