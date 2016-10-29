var expect = require('expect.js');
var sinon = require('sinon');

describe('integration test', function() {
    beforeEach(function() {
        delete require.cache[require.resolve('../test-server.js')];
    });
    describe('binder with init config', function() {
        var subject;
        beforeEach(function() {
            subject = require('../test-server.js');
        });
        it('should bind controller correctly', function() {
            expect(typeof binder.resolve('controller')).to.be('object');
        });
    });

    describe('binder that has been autowired', function() {
        var subject;
        beforeEach(function() {
            process.argv[2] = '-n';
            subject = require('../test-server.js');
        });
        afterEach(function() {
            console.log(binder.objectGraph);
        });
        it('should bind controller correctly', function() {
            expect(typeof binder.resolve('controller')).to.be('object');
            expect(typeof binder.resolve('client')).to.be('object');
        });
        describe('start', function() {
            var actual;
            beforeEach(function() {
                process.argv[2] = '-n';
                process.argv[3] = '-s';
                actual = subject.start();
            });

            it('should return the expected value', function() {
                expect(actual).to.be("something!");
            });
        });
    });
});
