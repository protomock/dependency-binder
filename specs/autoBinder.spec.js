var expect = require('expect.js');
var sinon = require('sinon');

describe('auto-binder', function() {
    var autowire,
        subject,
        binder;
    beforeEach(function() {
        autowire = require('../auto-binder.js');
        global.binder = {
            bindAll: sinon.stub()
        };
        subject = new autowire();
    });

    it('should have the autowire function', function() {
        expect(typeof subject.autowire).to.be('function');
    });

    describe('autowire', function() {
        var createPackageGraphStub,
            createSrcGraphStub;
        beforeEach(function() {
            createPackageGraphStub = sinon.stub(subject.directoryGrapher, "createPackageGraph");
            createPackageGraphStub.returns({
                'name': {}
            })

            createSrcGraphStub = sinon.stub(subject.directoryGrapher, "createSrcGraph");
            createSrcGraphStub.returns({
                'name': {},
                'src_name': {}
            });
            subject.autowire('__dirname', './source directory');
        });
        afterEach(function() {
            createPackageGraphStub.restore();
            createSrcGraphStub.restore();
        });

        it('should call createPackageGraph with the correct directory', function() {
            expect(createPackageGraphStub.called).to.be(true);
            expect(createPackageGraphStub.getCall(0).args[0]).to.be('__dirname');
            expect(createPackageGraphStub.getCall(0).args[1]).to.be('./source directory');
        });

        it('should call createSrcGraph with the correct directory and graph', function() {
            expect(createSrcGraphStub.called).to.be(true);
            expect(createSrcGraphStub.getCall(0).args[0]).to.be('__dirname/source directory/');
            expect(typeof createSrcGraphStub.getCall(0).args[1].name).to.be('object');
        });

        it('should call setObjectGraph with the correct object', function() {
            expect(global.binder.bindAll.called).to.be(true);
            expect(typeof global.binder.bindAll.getCall(0).args[0].name).to.be('object');
            expect(typeof global.binder.bindAll.getCall(0).args[0].src_name).to.be('object');
        });

    });
});
