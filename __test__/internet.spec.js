const { assert } = require('chai');
const sinon = require('sinon');
const slugify = require('../vendor/slugify');
const pure = require('../index');

describe('internet.js', () => {
    describe('email()', () => {
        it('returns an email', () => {
            sinon.stub(pure.internet, 'userName').returns('Aiden.Harann55');
            const email = pure.internet.email('Aiden.Harann55');
            let res = email.split('@');
            [res] = res;
            assert.equal(res, 'aiden.harann55');
            pure.internet.userName.restore();
        });
    });

    describe('exampleEmail', () => {
        it('returns an email with the correct name', () => {
            sinon.stub(pure.internet, 'userName').returns('Aiden.Harann55');
            const email = pure.internet.email('Aiden.Harann55');
            let res = email.split('@');
            [res] = res;
            assert.equal(res, 'aiden.harann55');
            pure.internet.userName.restore();
        });

        it('uses the example.[org|com|net] host', () => {
            const email = pure.internet.exampleEmail();
            assert.ok(email.match(/@example\.(org|com|net)$/));
        });
    });

    describe('userName()', () => {
        it('occasionally returns a single firstName', () => {
            sinon.stub(pure.random, 'number').returns(0);
            sinon.spy(pure.name, 'firstName');
            const username = pure.internet.userName();

            assert.ok(username);
            assert.ok(pure.name.firstName.called);

            pure.random.number.restore();
            pure.name.firstName.restore();
        });

        it('occasionally returns a firstName with a period or hyphen and a lastName', () => {
            sinon.stub(pure.random, 'number').returns(1);
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.random, 'arrayElement');
            const username = pure.internet.userName();

            assert.ok(username);
            assert.ok(pure.name.firstName.called);
            assert.ok(pure.name.lastName.called);
            assert.ok(pure.random.arrayElement.calledWith(['.', '_']));

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

            assert.ok(username);
            assert.ok(pure.name.firstName.called);
            assert.ok(username.match(/[\w]+\d/g));

            pure.random.number.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.random.arrayElement.restore();
        });
    });

    describe('domainName()', () => {
        it('returns a domainWord plus a random suffix', () => {
            sinon.stub(pure.internet, 'domainWord').returns('bar');
            sinon.stub(pure.internet, 'domainSuffix').returns('net');

            const domainName = pure.internet.domainName();

            assert.equal(domainName, 'bar.net');

            pure.internet.domainWord.restore();
            pure.internet.domainSuffix.restore();
        });
    });

    describe('domainWord()', () => {
        it('returns a lower-case firstName', () => {
            sinon.stub(pure.name, 'firstName').returns('FOO');
            const domainWord = pure.internet.domainWord();

            assert.ok(domainWord);
            assert.strictEqual(domainWord, 'foo');

            pure.name.firstName.restore();
        });
        describe('when the firstName used contains a apostrophe', () => {
            sinon.stub(pure.name, 'firstName').returns('d\'angelo');
            const domainWord = pure.internet.domainWord();

            it('should remove the apostrophe', () => {
                assert.strictEqual(domainWord, 'dangelo');
            });

            pure.name.firstName.restore();
        });

        it('should remove special characters and spaces from domain', () => {
            sinon.stub(pure.name, 'firstName').returns('ana júlia');

            const domainWord = pure.internet.domainWord();

            assert.strictEqual(domainWord, 'ana-julia');

            pure.name.firstName.restore();
        });

        it('return random word when slugify returns empty string', () => {
            sinon.stub(pure.name, 'firstName').returns('FOO');
            sinon.stub(slugify, 'default').returns('');
            const domainWord = pure.internet.domainWord();

            assert.ok(domainWord);
            assert.ok(domainWord.length > 0);

            pure.name.firstName.restore();
            slugify.default.restore();
        });
    });

    describe('protocol()', () => {
        it('returns a valid protocol', () => {
            const protocol = pure.internet.protocol();
            assert.ok(protocol);
        });

        it('should occasionally return http', () => {
            sinon.stub(pure.random, 'number').returns(0);
            const protocol = pure.internet.protocol();
            assert.ok(protocol);
            assert.strictEqual(protocol, 'http');

            pure.random.number.restore();
        });

        it('should occasionally return https', () => {
            sinon.stub(pure.random, 'number').returns(1);
            const protocol = pure.internet.protocol();
            assert.ok(protocol);
            assert.strictEqual(protocol, 'https');

            pure.random.number.restore();
        });
    });

    describe('url()', () => {
        it('returns a valid url', () => {
            sinon.stub(pure.internet, 'protocol').returns('http');
            sinon.stub(pure.internet, 'domainWord').returns('bar');
            sinon.stub(pure.internet, 'domainSuffix').returns('net');

            const url = pure.internet.url();

            assert.ok(url);
            assert.strictEqual(url, 'http://bar.net');
        });

        it('returns a url with protocol and domainName specified ', () => {
            const url = pure.internet.url('https', 'foo.com');

            assert.ok(url);
            assert.strictEqual(url, 'https://foo.com');
        });
    });

    describe('ip()', () => {
        it('returns a random IP address with four parts', () => {
            const ip = pure.internet.ip();
            const parts = ip.split('.');
            assert.equal(parts.length, 4);
        });
    });

    describe('ipv6()', () => {
        it('returns a random IPv6 address with eight parts', () => {
            const ip = pure.internet.ipv6();
            const parts = ip.split(':');
            assert.equal(parts.length, 8);
        });
    });

    describe('userAgent()', () => {
        it('returns a valid user-agent', () => {
            const ua = pure.internet.userAgent();
            assert.ok(ua);
        });

        it('is deterministic', () => {
            pure.seed(1);
            const ua1 = pure.internet.userAgent();
            pure.seed(1);
            const ua2 = pure.internet.userAgent();
            assert.equal(ua1, ua2);
        });
    });

    describe('color()', () => {
        it('returns a valid hex value (like #ffffff)', () => {
            const color = pure.internet.color(100, 100, 100);
            assert.ok(color.match(/^#[a-f0-9]{6}$/));
        });
    });

    describe('mac()', () => {
        it('returns a random MAC address with 6 hexadecimal digits', () => {
            const mac = pure.internet.mac();
            assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));
        });

        it('uses the dash separator if we pass it in as our separator', () => {
            const mac = pure.internet.mac('-');
            assert.ok(mac.match(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/));
        });

        it('uses no separator if we pass in an empty string', () => {
            const mac = pure.internet.mac('');
            assert.ok(mac.match(/^[a-f0-9]{12}$/));
        });

        it('uses the default colon (:) if we provide an unacceptable separator', () => {
            let mac = pure.internet.mac('!');
            assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));

            mac = pure.internet.mac('&');
            assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));
        });
    });

    describe('password()', () => {
        it('generate password that is memorable with only letters', () => {
            const password = pure.internet.password(undefined, true, undefined, undefined);

            assert.ok(password.match(/\w/g));
        });
        it('generate password that is memorable with only letters when parameter is null', () => {
            const password = pure.internet.password(null, null, undefined, undefined);

            assert.ok(password.match(/\w/g));
        });
    });
});
