const sinon = require('sinon');
const slugify = require('slugify');
const pure = require('../index');

describe('internet.js', () => {
    describe('email()', () => {
        it('returns an email', () => {
            sinon.stub(pure.internet, 'userName').returns('Aiden.Harann55');

            const email = pure.internet.email({ firstName: 'Aiden', lastName: 'Harann' });
            let res = email.split('@');
            [res] = res;

            expect(res).toEqual('aiden.harann55');

            pure.internet.userName.restore();
        });

        it('returns an email when provider is undefined', () => {
            const email = pure.internet.email({ firstName: 'Aiden', lastName: 'Harann' });

            expect(typeof email).toBe('string');
            expect(email).not.toContain('undefined');
        });

        it('returns email passing specific first name, last name and provider', () => {
            pure.seed(416344349);
            const email = pure.internet.email({ firstName: 'first', lastName: 'last', provider: 'email' });

            expect(email).toContain('first');
            expect(email).toContain('last');
            expect(email).toContain('email');

            pure.seed();
        });
    });

    describe('exampleEmail', () => {
        it('returns an email with the correct name', () => {
            sinon.stub(pure.internet, 'userName').returns('Aiden.Harann55');

            const email = pure.internet.email({ firstName: 'Aiden', lastName: 'Harann' });
            let res = email.split('@');
            [res] = res;

            expect(res).toEqual('aiden.harann55');

            pure.internet.userName.restore();
        });

        it('uses the example.[org|com|net] host', () => {
            const email = pure.internet.exampleEmail();

            expect(/@example\.(org|com|net)$/.test(email)).toEqual(true);
        });
    });

    describe('userName()', () => {
        it('occasionally returns a single firstName', () => {
            sinon.stub(pure.random, 'number').returns(0);
            sinon.spy(pure.name, 'firstName');

            const username = pure.internet.userName();

            expect(username).toBeDefined();
            expect(pure.name.firstName.called).toEqual(true);

            pure.random.number.restore();
            pure.name.firstName.restore();
        });

        it('occasionally returns a firstName with a period or hyphen and a lastName', () => {
            sinon.stub(pure.random, 'number').returns(1);
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.random, 'arrayElement');

            const username = pure.internet.userName();

            expect(username).toBeDefined();
            expect(pure.name.firstName.called).toEqual(true);
            expect(pure.name.lastName.called).toEqual(true);
            expect(pure.random.arrayElement.calledWith(['.', '_'])).toEqual(true);

            pure.random.number.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.random.arrayElement.restore();
        });

        it('return username with firstname and number when random.number is greater than 3', () => {
            sinon.stub(pure.random, 'number').returns(3);
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.random, 'arrayElement');

            const username = pure.internet.userName();

            expect(username).toBeDefined();
            expect(pure.name.firstName.called).toEqual(true);
            expect(/[\w]+\d/g.test(username)).toEqual(true);

            pure.random.number.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.random.arrayElement.restore();
        });

        it('return username with firstname and number when random.number is 2', () => {
            sinon.stub(pure.random, 'number').returns(2);

            const username = pure.internet.userName();

            expect(username).toBeDefined();

            pure.random.number.restore();
        });
    });

    describe('domainName()', () => {
        it('returns a domainWord plus a random suffix', () => {
            sinon.stub(pure.internet, 'domainWord').returns('bar');
            sinon.stub(pure.internet, 'domainSuffix').returns('net');

            const domainName = pure.internet.domainName();

            expect(domainName).toEqual('bar.net');

            pure.internet.domainWord.restore();
            pure.internet.domainSuffix.restore();
        });
    });

    describe('domainWord()', () => {
        it('returns a lower-case firstName', () => {
            sinon.stub(pure.name, 'firstName').returns('FOO');
            const domainWord = pure.internet.domainWord();

            expect(domainWord).toBeDefined();
            expect(domainWord).toEqual('foo');

            pure.name.firstName.restore();
        });

        it('should remove the apostrophe', () => {
            sinon.stub(pure.name, 'firstName').returns('d\'angelo');

            const domainWord = pure.internet.domainWord();

            expect(domainWord).toEqual('dangelo');

            pure.name.firstName.restore();
        });

        it('should remove special characters and spaces from domain', () => {
            sinon.stub(pure.name, 'firstName').returns('ana júlia');

            const domainWord = pure.internet.domainWord();

            expect(domainWord).toEqual('ana-julia');

            pure.name.firstName.restore();
        });

        it('return random word when slugify returns empty string', () => {
            sinon.stub(pure.name, 'firstName').returns('FOO');
            sinon.stub(slugify, 'default').returns('');

            const domainWord = pure.internet.domainWord();

            expect(domainWord).toBeDefined();
            expect(domainWord.length).toBeGreaterThan(0);

            pure.name.firstName.restore();
            slugify.default.restore();
        });
    });

    describe('protocol()', () => {
        it('returns a valid protocol', () => {
            const protocol = pure.internet.protocol();

            expect(protocol).toBeDefined();
        });

        it('should occasionally return http', () => {
            sinon.stub(pure.random, 'number').returns(0);

            const protocol = pure.internet.protocol();

            expect(protocol).toBeDefined();
            expect(protocol).toEqual('http');

            pure.random.number.restore();
        });

        it('should occasionally return https', () => {
            sinon.stub(pure.random, 'number').returns(1);

            const protocol = pure.internet.protocol();

            expect(protocol).toBeDefined();
            expect(protocol).toEqual('https');

            pure.random.number.restore();
        });
    });

    describe('url()', () => {
        it('returns a valid url', () => {
            sinon.stub(pure.internet, 'protocol').returns('http');
            sinon.stub(pure.internet, 'domainWord').returns('bar');
            sinon.stub(pure.internet, 'domainSuffix').returns('net');

            const url = pure.internet.url();

            expect(url).toBeDefined();
            expect(url).toEqual('http://bar.net');
        });

        it('returns a url with protocol and domainName specified', () => {
            const url = pure.internet.url({ protocol: 'https', domainName: 'foo.com' });

            expect(url).toBeDefined();
            expect(url).toEqual('https://foo.com');
        });
    });

    describe('ip()', () => {
        it('returns a random IP address with four parts', () => {
            const ip = pure.internet.ip();
            const parts = ip.split('.');

            expect(parts.length).toEqual(4);
        });
    });

    describe('ipv6()', () => {
        it('returns a random IPv6 address with eight parts', () => {
            const ip = pure.internet.ipv6();
            const parts = ip.split(':');

            expect(parts.length).toEqual(8);
        });
    });

    describe('userAgent()', () => {
        it('returns a valid user-agent', () => {
            const ua = pure.internet.userAgent();

            expect(ua).toBeDefined();
        });

        it('is deterministic', () => {
            pure.seed(1);
            const ua1 = pure.internet.userAgent();

            pure.seed(1);
            const ua2 = pure.internet.userAgent();

            expect(ua1).toEqual(ua2);

            pure.seed();
        });
    });

    describe('color()', () => {
        it('returns a valid hex value (like #ffffff)', () => {
            const color = pure.internet.color({ baseRed255: 100, baseGreen255: 100, baseBlue255: 100 });

            expect(/^#[a-f0-9]{6}$/.test(color)).toEqual(true);
        });

        it('returns a valid hex value when no argument passed', () => {
            const color = pure.internet.color();

            expect(/^#[a-f0-9]{6}$/.test(color)).toEqual(true);
        });

        it('returns a valid hex value when stubbing math', () => {
            sinon.stub(Math, 'floor').returns(1);

            const color = pure.internet.color({ baseRed255: 0, baseGreen255: 0, baseBlue255: 0 });

            expect(/^#[a-f0-9]{6}$/.test(color)).toEqual(true);

            Math.floor.restore();
        });
    });

    describe('mac()', () => {
        it('returns a random MAC address with 6 hexadecimal digits', () => {
            const mac = pure.internet.mac();

            expect(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/.test(mac)).toEqual(true);
        });

        it('uses the dash separator if we pass it in as our separator', () => {
            const mac = pure.internet.mac('-');

            expect(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/.test(mac)).toEqual(true);
        });

        it('uses no separator if we pass in an empty string', () => {
            const mac = pure.internet.mac('');

            expect(/^[a-f0-9]{12}$/.test(mac)).toEqual(true);
        });

        it('uses the default colon (:) if we provide an unacceptable separator', () => {
            const mac = pure.internet.mac('!');
            const mac2 = pure.internet.mac('&');

            expect(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/.test(mac)).toEqual(true);
            expect(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/.test(mac2)).toEqual(true);
        });
    });

    describe('password()', () => {
        it('generate password that is memorable with only letters', () => {
            const password = pure.internet.password({ memorable: true });

            expect(/\w/g.test(password)).toEqual(true);
        });

        it('generate password without argument passed', () => {
            const password = pure.internet.password();

            expect(typeof password).toBe('string');
            expect(/[A-Za-z0-9]+/g.test(password)).toEqual(true);
        });
    });
});
