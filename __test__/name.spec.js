const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('name.js', () => {
    describe('firstName()', () => {
        it('returns a random name', () => {
            sinon.stub(pure.name, 'firstName').returns('foo');
            const firstName = pure.name.firstName();

            assert.equal(firstName, 'foo');

            pure.name.firstName.restore();
        });
    });

    describe('lastName()', () => {
        it('returns a random name', () => {
            sinon.stub(pure.name, 'lastName').returns('foo');

            const lastName = pure.name.lastName();

            assert.equal(lastName, 'foo');

            pure.name.lastName.restore();
        });
        describe('When using RU locale', () => {
            it('returns localized lastname', () => {
                pure.locale = 'ru';
                const lastNameRu = pure.name.lastName();

                assert.ok(typeof lastNameRu === 'string');
                expect(lastNameRu.length).greaterThan(1);

                pure.locale = 'en';
            });
            it('and passing "gender" parameter as 1', () => {
                pure.locale = 'ru';
                const lastNameRu = pure.name.lastName(1);

                assert.ok(typeof lastNameRu === 'string');
                expect(lastNameRu.length).greaterThan(1);

                pure.locale = 'en';
            });
        });
    });

    describe('findName()', () => {
        it('usually returns a first name and last name', () => {
            sinon.stub(pure.random, 'number').returns(5);
            const name = pure.name.findName();
            assert.ok(name);
            const parts = name.split(' ');

            assert.strictEqual(parts.length, 2);

            pure.random.number.restore();
        });

        it('occasionally returns a first name and last name with a prefix', () => {
            sinon.stub(pure.random, 'number').returns(0);
            const name = pure.name.findName();
            const parts = name.split(' ');

            assert.ok(parts.length >= 3);

            pure.random.number.restore();
        });

        it('occasionally returns a male full name with a prefix', () => {
            sinon.stub(pure.random, 'number')
                .withArgs(8).returns(0) // with prefix
                .withArgs(1)
                .returns(0); // gender male

            sinon.stub(pure.name, 'prefix').withArgs(0).returns('X');
            sinon.stub(pure.name, 'firstName').withArgs(0).returns('Y');
            sinon.stub(pure.name, 'lastName').withArgs(0).returns('Z');

            const name = pure.name.findName();

            assert.equal(name, 'X Y Z');

            pure.random.number.restore();
            pure.name.prefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
        });

        it('occasionally returns a female full name with a prefix', () => {
            sinon.stub(pure.random, 'number')
                .withArgs(8).returns(0) // with prefix
                .withArgs(1)
                .returns(1); // gender female

            sinon.stub(pure.name, 'prefix').withArgs(1).returns('J');
            sinon.stub(pure.name, 'firstName').withArgs(1).returns('K');
            sinon.stub(pure.name, 'lastName').withArgs(1).returns('L');

            const name = pure.name.findName();

            assert.equal(name, 'J K L');

            pure.random.number.restore();
            pure.name.prefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
        });

        it('occasionally returns a first name and last name with a suffix', () => {
            sinon.stub(pure.random, 'number').returns(1);
            sinon.stub(pure.name, 'suffix').returns('Jr.');
            const name = pure.name.findName();
            const parts = name.split(' ');

            assert.ok(parts.length >= 3);
            assert.equal(parts[parts.length - 1], 'Jr.');

            pure.name.suffix.restore();
            pure.random.number.restore();
        });

        it('needs to work with specific locales and respect the fallbacks', () => {
            pure.locale = 'en_US';
            // this will throw if this is broken
            pure.name.findName();
        });
    });

    describe('title()', () => {
        it('returns a random title', () => {
            sinon.stub(pure.name, 'title').returns('Lead Solutions Supervisor');

            const title = pure.name.title();

            assert.equal(title, 'Lead Solutions Supervisor');

            pure.name.title.restore();
        });
    });

    describe('jobTitle()', () => {
        it('returns a job title consisting of a descriptor, area, and type', () => {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.name, 'jobDescriptor');
            sinon.spy(pure.name, 'jobArea');
            sinon.spy(pure.name, 'jobType');
            const jobTitle = pure.name.jobTitle();

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

    describe('prefix()', () => {
        describe('when using a locale with gender specific name prefixes', () => {
            beforeEach(function check() {
                this.oldLocale = pure.locale;
                pure.locale = 'TEST';

                pure.locales.TEST = {
                    name: {
                        male_prefix: ['Mp'],
                        female_prefix: ['Fp'],
                    },
                };
            });

            afterEach(function check() {
                pure.locale = this.oldLocale;
                delete pure.locale.TEST;
            });

            it('returns male prefix', () => {
                const prefix = pure.name.prefix(0);
                assert.equal(prefix, 'Mp');
            });

            it('returns female prefix', () => {
                const prefix = pure.name.prefix(1);

                assert.equal(prefix, 'Fp');
            });

            it('returns either prefix', () => {
                const prefix = pure.name.prefix();
                assert(['Mp', 'Fp'].indexOf(prefix) >= 0);
            });
        });

        describe('when using a locale without gender specific name prefixes', () => {
            beforeEach(function check() {
                this.oldLocale = pure.locale;
                pure.locale = 'TEST';

                pure.locales.TEST = {
                    name: {
                        prefix: ['P'],
                    },
                };
            });

            afterEach(function check() {
                pure.locale = this.oldLocale;
                delete pure.locale.TEST;
            });

            it('returns a prefix', () => {
                const prefix = pure.name.prefix();

                assert.equal(prefix, 'P');
            });
        });
    });
});
