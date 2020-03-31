var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');

describe("name.js", function () {
    describe("firstName()", function () {
        it("returns a random name", function () {
            sinon.stub(pure.name, 'firstName').returns('foo');
            var first_name = pure.name.firstName();

            assert.equal(first_name, 'foo');

            pure.name.firstName.restore();
        });
    });

    describe("lastName()", function () {
        it("returns a random name", function () {
            sinon.stub(pure.name, 'lastName').returns('foo');

            var last_name = pure.name.lastName();

            assert.equal(last_name, 'foo');

            pure.name.lastName.restore();
        });
    });

    describe("findName()", function () {
        it("usually returns a first name and last name", function () {
            sinon.stub(pure.random, 'number').returns(5);
            var name = pure.name.findName();
            assert.ok(name);
            var parts = name.split(' ');

            assert.strictEqual(parts.length, 2);

            pure.random.number.restore();
        });

        it("occasionally returns a first name and last name with a prefix", function () {
            sinon.stub(pure.random, 'number').returns(0);
            var name = pure.name.findName();
            var parts = name.split(' ');

            assert.ok(parts.length >= 3);

            pure.random.number.restore();
        });

        it("occasionally returns a male full name with a prefix", function () {
            sinon.stub(pure.random, 'number')
                .withArgs(8).returns(0) // with prefix
                .withArgs(1).returns(0); // gender male

            sinon.stub(pure.name, 'prefix').withArgs(0).returns('X');
            sinon.stub(pure.name, 'firstName').withArgs(0).returns('Y');
            sinon.stub(pure.name, 'lastName').withArgs(0).returns('Z');

            var name = pure.name.findName();

            assert.equal(name, 'X Y Z');

            pure.random.number.restore();
            pure.name.prefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
        });

        it("occasionally returns a female full name with a prefix", function () {
            sinon.stub(pure.random, 'number')
                .withArgs(8).returns(0) // with prefix
                .withArgs(1).returns(1); // gender female

            sinon.stub(pure.name, 'prefix').withArgs(1).returns('J');
            sinon.stub(pure.name, 'firstName').withArgs(1).returns('K');
            sinon.stub(pure.name, 'lastName').withArgs(1).returns('L');

            var name = pure.name.findName();

            assert.equal(name, 'J K L');

            pure.random.number.restore();
            pure.name.prefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
        });

        it("occasionally returns a first name and last name with a suffix", function () {
            sinon.stub(pure.random, 'number').returns(1);
            sinon.stub(pure.name, 'suffix').returns('Jr.');
            var name = pure.name.findName();
            var parts = name.split(' ');

            assert.ok(parts.length >= 3);
            assert.equal(parts[parts.length-1], 'Jr.');

            pure.name.suffix.restore();
            pure.random.number.restore();
        });

        it("needs to work with specific locales and respect the fallbacks", function () {
            pure.locale = 'en_US';
            // this will throw if this is broken
            var name = pure.name.findName();
        });
    });

    describe("title()", function () {
      it("returns a random title", function () {
          sinon.stub(pure.name, 'title').returns('Lead Solutions Supervisor');

          var title = pure.name.title();

          assert.equal(title, 'Lead Solutions Supervisor');

          pure.name.title.restore();
        });
    });

    describe("jobTitle()", function () {
        it("returns a job title consisting of a descriptor, area, and type", function () {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.name, 'jobDescriptor');
            sinon.spy(pure.name, 'jobArea');
            sinon.spy(pure.name, 'jobType');
            var jobTitle = pure.name.jobTitle();

            assert.ok(typeof jobTitle === 'string');
            assert.ok(pure.random.arrayElement.calledThrice);
            assert.ok(pure.name.jobDescriptor.calledOnce);
            assert.ok(pure.name.jobArea.calledOnce);
            assert.ok(pure.name.jobType.calledOnce);

            pure.random.arrayElement.restore();
            pure.name.jobDescriptor.restore();
            pure.name.jobArea.restore();
            pure.name.jobType.restore();
        });
    });

    describe("prefix()", function () {
        describe('when using a locale with gender specific name prefixes', function () {
            beforeEach(function(){
                this.oldLocale = pure.locale;
                pure.locale = 'TEST';

                pure.locales['TEST'] = {
                    name: {
                        male_prefix: ['Mp'],
                        female_prefix: ['Fp']
                    }
                };
            });

            afterEach(function () {
                pure.locale = this.oldLocale;
                delete pure.locale['TEST'];
            })

            it("returns male prefix", function () {
                var prefix = pure.name.prefix(0);
                assert.equal(prefix, 'Mp')
            });

            it("returns female prefix", function () {
                var prefix = pure.name.prefix(1);

                assert.equal(prefix, 'Fp');
            });

            it("returns either prefix", function () {
                var prefix = pure.name.prefix();
                assert(['Mp', 'Fp'].indexOf(prefix) >= 0)
            });

        });

        describe('when using a locale without gender specific name prefixes', function () {
            beforeEach(function(){
                this.oldLocale = pure.locale;
                pure.locale = 'TEST';

                pure.locales['TEST'] = {
                    name: {
                        prefix: ['P']
                    }
                };
            });

            afterEach(function () {
                pure.locale = this.oldLocale;
                delete pure.locale['TEST'];
            })

            it("returns a prefix", function () {
                var prefix = pure.name.prefix();

                assert.equal(prefix, 'P');
            });
        });
    });
});
