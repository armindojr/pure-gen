import sinon from 'sinon';
import pure from '../index.js';

describe('name.js', () => {
    describe('firstName()', () => {
        it('returns a random name when locale doesn\'t have male and female names', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                firstName: ['foo'],
                maleFirstName: undefined,
                femaleFirstName: undefined,
            }));

            const firstName = pure.name.firstName();

            expect(typeof firstName).toBe('string');
            expect(firstName).toEqual('foo');

            stub.restore();
        });

        it('returns a random name when locale have male and female names', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                firstName: ['foo'],
                maleFirstName: [
                    'bar',
                ],
                femaleFirstName: [
                    'test',
                ],
            }));

            const firstName = pure.name.firstName();

            expect(typeof firstName).toBe('string');
            expect(firstName).toEqual('foo');

            stub.restore();
        });

        it('returns a random name when firstName is undefined and random number is 0', () => {
            sinon.stub(pure.random, 'number').returns(0);
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                firstName: undefined,
                maleFirstName: [
                    'bar',
                ],
                femaleFirstName: [
                    'test',
                ],
            }));

            const firstName = pure.name.firstName();

            expect(typeof firstName).toBe('string');
            expect(firstName).toEqual('bar');

            pure.random.number.restore();
            stub.restore();
        });

        it('returns a random name when firstName is undefined and random number is 1', () => {
            sinon.stub(pure.random, 'number').returns(1);
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                firstName: undefined,
                maleFirstName: [
                    'bar',
                ],
                femaleFirstName: [
                    'test',
                ],
            }));

            const firstName = pure.name.firstName();

            expect(typeof firstName).toBe('string');
            expect(firstName).toEqual('test');

            pure.random.number.restore();
            stub.restore();
        });

        it('returns a random name when parameter is 0', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                firstName: ['foo'],
                maleFirstName: [
                    'bar',
                ],
                femaleFirstName: [
                    'test',
                ],
            }));

            const firstName = pure.name.firstName(0);

            expect(typeof firstName).toBe('string');
            expect(firstName).toEqual('bar');

            stub.restore();
        });

        it('returns a random name when parameter is 1', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                firstName: ['foo'],
                maleFirstName: [
                    'bar',
                ],
                femaleFirstName: [
                    'test',
                ],
            }));

            const firstName = pure.name.firstName(1);

            expect(typeof firstName).toBe('string');
            expect(firstName).toEqual('test');

            stub.restore();
        });
    });

    describe('lastName()', () => {
        it('returns a random name when locale doesn\'t have male and female names', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: undefined,
                femaleLastName: undefined,
            }));

            const lastName = pure.name.lastName();

            expect(lastName).toEqual('foo');

            stub.restore();
        });

        it('returns a random name when random number is 0', () => {
            sinon.stub(pure.random, 'number').returns(0);
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: [ 'bar' ],
                femaleLastName: [ 'test' ],
            }));

            const lastName = pure.name.lastName();

            expect(lastName).toEqual('bar');

            pure.random.number.restore();
            stub.restore();
        });

        it('returns a random name when random number is 1', () => {
            sinon.stub(pure.random, 'number').returns(1);
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: [ 'bar' ],
                femaleLastName: [ 'test' ],
            }));

            const lastName = pure.name.lastName();

            expect(lastName).toEqual('test');

            pure.random.number.restore();
            stub.restore();
        });

        it('returns a random name when parameter is 0', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: [ 'bar' ],
                femaleLastName: [ 'test' ],
            }));

            const lastName = pure.name.lastName(0);

            expect(lastName).toEqual('bar');

            stub.restore();
        });

        it('returns a random name when parameter is 0 and male last name is undefined', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: undefined,
                femaleLastName: [ 'test' ],
            }));

            const lastName = pure.name.lastName(0);

            expect(lastName).toEqual('foo');

            stub.restore();
        });

        it('returns a random name when parameter is 1', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: [ 'bar' ],
                femaleLastName: [ 'test' ],
            }));

            const lastName = pure.name.lastName(1);

            expect(lastName).toEqual('test');

            stub.restore();
        });

        it('returns a random name when parameter is 1 and female last name is undefined', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: [ 'bar' ],
                femaleLastName: undefined,
            }));

            const lastName = pure.name.lastName(1);

            expect(lastName).toEqual('foo');

            stub.restore();
        });

        it('returns a random name when parameter is 0 and locale doesn\'t have gendered names', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                lastName: [ 'foo' ],
                maleLastName: undefined,
                femaleLastName: undefined,
            }));

            const lastName = pure.name.lastName(0);

            expect(lastName).toEqual('foo');

            stub.restore();
        });
    });

    describe('findName()', () => {
        it('usually returns a first name and last name', () => {
            sinon.stub(pure.random, 'number').returns(5);

            const name = pure.name.findName();
            const parts = name.split(' ');

            expect(name).toBeDefined();
            expect(parts.length).toEqual(2);

            pure.random.number.restore();
        });

        it('occasionally returns a first name and last name with a prefix', () => {
            sinon.stub(pure.random, 'number').returns(0);

            const name = pure.name.findName();
            const parts = name.split(' ');

            expect(parts.length).toBeGreaterThanOrEqual(3);

            pure.random.number.restore();
        });

        it('occasionally returns a male full name with a prefix', () => {
            sinon.stub(pure.random, 'number')
                .withArgs(8)
                .returns(0) // with prefix
                .withArgs(1)
                .returns(0); // gender male

            sinon.stub(pure.name, 'prefix').withArgs(0).returns('X');
            sinon.stub(pure.name, 'firstName').withArgs(0).returns('Y');
            sinon.stub(pure.name, 'lastName').withArgs(0).returns('Z');

            const name = pure.name.findName();

            expect(name).toEqual('X Y Z');

            pure.random.number.restore();
            pure.name.prefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
        });

        it('occasionally returns a female full name with a prefix', () => {
            sinon.stub(pure.random, 'number')
                .withArgs(8)
                .returns(0) // with prefix
                .withArgs(1)
                .returns(1); // gender female

            sinon.stub(pure.name, 'prefix').withArgs(1).returns('J');
            sinon.stub(pure.name, 'firstName').withArgs(1).returns('K');
            sinon.stub(pure.name, 'lastName').withArgs(1).returns('L');

            const name = pure.name.findName();

            expect(name).toEqual('J K L');

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

            expect(parts.length).toBeGreaterThanOrEqual(3);
            expect(parts[parts.length - 1]).toEqual('Jr.');

            pure.name.suffix.restore();
            pure.random.number.restore();
        });
    });

    describe('title()', () => {
        it('returns a random title stubbed', () => {
            sinon.stub(pure.name, 'title').returns('Lead Solutions Supervisor');

            const title = pure.name.title();

            expect(title).toEqual('Lead Solutions Supervisor');

            pure.name.title.restore();
        });

        it('returns a random title', () => {
            const title = pure.name.title();

            expect(title).toBeDefined();
        });
    });

    describe('jobTitle()', () => {
        it('returns a job title consisting of a descriptor, area, and type', () => {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.name, 'jobDescriptor');
            sinon.spy(pure.name, 'jobArea');
            sinon.spy(pure.name, 'jobType');

            const jobTitle = pure.name.jobTitle();

            expect(typeof jobTitle).toBe('string');
            expect(pure.random.arrayElement.calledThrice).toEqual(true);
            expect(pure.name.jobDescriptor.calledOnce).toEqual(true);
            expect(pure.name.jobArea.calledOnce).toEqual(true);
            expect(pure.name.jobType.calledOnce).toEqual(true);

            pure.random.arrayElement.restore();
            pure.name.jobDescriptor.restore();
            pure.name.jobArea.restore();
            pure.name.jobType.restore();
        });
    });

    describe('gender()', () => {
        it('returns random gender', () => {
            const gender = pure.name.gender();

            expect(gender).toBeDefined();
        });
    });

    describe('prefix()', () => {
        it('returns male prefix', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                malePrefix: ['Mp'],
                femalePrefix: ['Fp'],
            }));

            const prefix = pure.name.prefix(0);

            expect(prefix).toEqual('Mp');

            stub.restore();
        });

        it('returns female prefix', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                malePrefix: ['Mp'],
                femalePrefix: ['Fp'],
            }));

            const prefix = pure.name.prefix(1);

            expect(prefix).toEqual('Fp');

            stub.restore();
        });

        it('returns either prefix', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                malePrefix: ['Mp'],
                femalePrefix: ['Fp'],
            }));

            const prefix = pure.name.prefix();

            expect(['Mp', 'Fp'].indexOf(prefix)).toBeGreaterThanOrEqual(0);

            stub.restore();
        });

        it('returns a prefix', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                prefix: ['P'],
            }));

            const prefix = pure.name.prefix();

            expect(prefix).toEqual('P');

            stub.restore();
        });
    });

    describe('suffix()', () => {
        it('returns random name suffix', () => {
            const stub = sinon.stub(pure.registeredModules, 'name').get(() => ({
                suffix: [ 'foo' ]
            }));

            const suffix = pure.name.suffix();

            expect(suffix).toEqual('foo');

            stub.restore();
        })
    })
});
