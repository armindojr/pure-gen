if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

describe("internet.js", function () {
    describe("email()", function () {
        it("returns an email", function () {
            sinon.stub(pure.internet, 'userName').returns('Aiden.Harann55');
            var email = pure.internet.email("Aiden.Harann55");
            var res = email.split("@");
            res = res[0];
            assert.equal(res, 'Aiden.Harann55');
            pure.internet.userName.restore();
        });
    });

    describe("exampleEmail", function () {
      it("returns an email with the correct name", function () {
          sinon.stub(pure.internet, 'userName').returns('Aiden.Harann55');
          var email = pure.internet.email("Aiden.Harann55");
          var res = email.split("@");
          res = res[0];
          assert.equal(res, 'Aiden.Harann55');
          pure.internet.userName.restore();
      });

      it("uses the example.[org|com|net] host", function () {
        var email = pure.internet.exampleEmail();
        assert.ok(email.match(/@example\.(org|com|net)$/));
      });
    });

    describe("userName()", function () {
        it("occasionally returns a single firstName", function () {
            sinon.stub(pure.random, 'number').returns(0);
            sinon.spy(pure.name, 'firstName');
            var username = pure.internet.userName();

            assert.ok(username);
            assert.ok(pure.name.firstName.called);

            pure.random.number.restore();
            pure.name.firstName.restore();
        });

        it("occasionally returns a firstName with a period or hyphen and a lastName", function () {
            sinon.stub(pure.random, 'number').returns(1);
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.random, 'arrayElement');
            var username = pure.internet.userName();

            assert.ok(username);
            assert.ok(pure.name.firstName.called);
            assert.ok(pure.name.lastName.called);
            assert.ok(pure.random.arrayElement.calledWith(['.', '_']));

            pure.random.number.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.random.arrayElement.restore();
        });
    });

    describe("domainName()", function () {
        it("returns a domainWord plus a random suffix", function () {
            sinon.stub(pure.internet, 'domainWord').returns('bar');
            sinon.stub(pure.internet, 'domainSuffix').returns('net');

            var domain_name = pure.internet.domainName();

            assert.equal(domain_name, 'bar.net');

            pure.internet.domainWord.restore();
            pure.internet.domainSuffix.restore();
        });
    });

    describe("domainWord()", function () {
        it("returns a lower-case firstName", function () {
            sinon.stub(pure.name, 'firstName').returns('FOO');
            var domain_word = pure.internet.domainWord();

            assert.ok(domain_word);
            assert.strictEqual(domain_word, 'foo');

            pure.name.firstName.restore();
        });
        describe("when the firstName used contains a apostrophe", function () {
          sinon.stub(pure.name, 'firstName').returns('d\'angelo');
          var domain_word = pure.internet.domainWord();

          it("should remove the apostrophe", function () {
            assert.strictEqual(domain_word, 'dangelo');
          });

          pure.name.firstName.restore();
        });

        it('should remove special characters and spaces from domain', function() {
            sinon.stub(pure.name, 'firstName').returns('ana júlia');

            var domain_word = pure.internet.domainWord();

            assert.strictEqual(domain_word, 'ana-julia');

            pure.name.firstName.restore();
        });
    });

    describe('protocol()', function () {
        it('returns a valid protocol', function () {
            var protocol = pure.internet.protocol();
            assert.ok(protocol);
        });

        it('should occasionally return http', function () {
            sinon.stub(pure.random, 'number').returns(0);
            var protocol = pure.internet.protocol();
            assert.ok(protocol);
            assert.strictEqual(protocol, 'http');

            pure.random.number.restore();
        });

        it('should occasionally return https', function () {
            sinon.stub(pure.random, 'number').returns(1);
            var protocol = pure.internet.protocol();
            assert.ok(protocol);
            assert.strictEqual(protocol, 'https');

            pure.random.number.restore();
        });
    });

    describe('url()', function () {
        it('returns a valid url', function () {
            sinon.stub(pure.internet,'protocol').returns('http');
            sinon.stub(pure.internet, 'domainWord').returns('bar');
            sinon.stub(pure.internet, 'domainSuffix').returns('net');

            var url = pure.internet.url();

            assert.ok(url);
            assert.strictEqual(url,'http://bar.net');
        });
    });

    describe("ip()", function () {
        it("returns a random IP address with four parts", function () {
            var ip = pure.internet.ip();
            var parts = ip.split('.');
            assert.equal(parts.length, 4);
        });
    });

    describe("ipv6()", function () {
        it("returns a random IPv6 address with eight parts", function () {
            var ip = pure.internet.ipv6();
            var parts = ip.split(':');
            assert.equal(parts.length, 8);
        });
    });

    describe("userAgent()", function () {
        it("returns a valid user-agent", function () {
            var ua = pure.internet.userAgent();
            assert.ok(ua);
        });
    });

    describe("color()", function () {
        it("returns a valid hex value (like #ffffff)", function () {
            var color = pure.internet.color(100, 100, 100);
            assert.ok(color.match(/^#[a-f0-9]{6}$/));
        });
    });

    describe("mac()", function () {
        it("returns a random MAC address with 6 hexadecimal digits", function () {
            var mac = pure.internet.mac();
            assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));
        });

        it("uses the dash separator if we pass it in as our separator", function () {
            var mac = pure.internet.mac('-');
            assert.ok(mac.match(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/));
        });

        it("uses no separator if we pass in an empty string", function() {
            var mac = pure.internet.mac('');
            assert.ok(mac.match(/^[a-f0-9]{12}$/));
        });

        it("uses the default colon (:) if we provide an unacceptable separator", function() {
            var mac = pure.internet.mac('!');
            assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));

            mac = pure.internet.mac('&');
            assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));
        });
    });
});
