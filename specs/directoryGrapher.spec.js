var expect = require('expect.js');
var sinon = require('sinon');

describe('directoryGrapher', function() {
    var subject,
        fsReadFileStub,
        fsReadDirStub,
        fsStatSyncStub,
        fsIsDirectory;

    beforeEach(function() {
        subject = require('../directory-grapher.js');
        fsReadFileStub = sinon.stub(subject.fs, 'readFileSync');
        fsReadDirStub = sinon.stub(subject.fs, 'readdirSync');
        fsStatSyncStub = sinon.stub(subject.fs, 'statSync');
        fsIsDirectory = {};
    });
    afterEach(function() {
        fsReadFileStub.restore();
        fsReadDirStub.restore();
        fsStatSyncStub.restore();
    });

    describe('createGraph', function() {
        var actual,
            packages;
        beforeEach(function() {
            packages = JSON.stringify({
                some: 'value',
                dependencies: {
                    fs: 'version-info',
                    'dependency-binder': 'this-should-not-be-included'
                }
            });
            fsReadFileStub.withArgs('/some-root-folder/package.json').returns(packages);
            actual = subject.createPackageGraph('/some-root-folder', '/some/src/folder');
        });

        it('should call readFileSync with the correct path', function() {
            expect(fsReadFileStub.called).to.be(true);
            expect(fsReadFileStub.getCall(0).args[0]).to.be('/some-root-folder/package.json');
        });

        it('should return the expected graph', function() {
            expect(typeof actual.fs).to.be('object');
        });
    });

    describe('createSrcGraph', function() {
        var actual,
            requireProviderStub,
            junkStub;
        beforeEach(function() {
            requireProviderStub = sinon.stub(subject.requireProvider, "provide");
            requireProviderStub.returns({
                "some": "object"
            });

            junkStub = sinon.stub(subject.junk, 'not');
            junkStub.returns(true);

            fsReadDirStub.withArgs('/some-src/').returns(['dir']);
            fsStatSyncStub.withArgs('/some-src/dir').returns({
                isDirectory: function() {
                    return true;
                }
            });

            fsReadDirStub.withArgs('/some-src/dir/').returns(['test.js']);
            fsStatSyncStub.withArgs('/some-src/dir/test.js').returns({
                isDirectory: function() {
                    return false;
                }
            });
            actual = subject.createSrcGraph('/some-src/', {});
        });

        afterEach(function() {
            requireProviderStub.restore();
            junkStub.restore();
        });

        it('should recurse twice', function() {
            expect(fsReadDirStub.calledTwice).to.be(true);
            expect(fsStatSyncStub.calledTwice).to.be(true);
            expect(requireProviderStub.called).to.be(true);
        });

        it('should return expected object graph', function() {
            expect(actual['test'].some).to.be("object");
        });
    });
});
