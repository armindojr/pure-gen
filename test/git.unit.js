if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var pure = require('../index');
}

describe("git.js", function() {
  describe("branch()", function() {
    beforeEach(function() {
      sinon.spy(pure.hacker, 'noun');
      sinon.spy(pure.hacker, 'verb');
    });

    afterEach(function() {
      pure.hacker.noun.restore();
      pure.hacker.verb.restore();
    });

    it("returns a branch with hacker noun and verb", function() {
      pure.git.branch();

      assert.ok(pure.hacker.noun.calledOnce);
      assert.ok(pure.hacker.verb.calledOnce);
    });
  });

  describe("commitEntry()", function() {
    beforeEach(function() {
      sinon.spy(pure.git, 'commitMessage');
      sinon.spy(pure.git, 'commitSha');
      sinon.spy(pure.internet, 'email');
      sinon.spy(pure.name, 'firstName');
      sinon.spy(pure.name, 'lastName');
      sinon.spy(pure.random, 'number');
    });

    afterEach(function() {
      pure.git.commitMessage.restore();
      pure.git.commitSha.restore();
      pure.internet.email.restore();
      pure.name.firstName.restore();
      pure.name.lastName.restore();
      pure.random.number.restore();
    });

    it("returns merge entry at random", function() {
      pure.git.commitEntry();

      assert.ok(pure.random.number.called);
    });

    it("returns a commit entry with git commit message and sha", function() {
      pure.git.commitEntry();

      assert.ok(pure.git.commitMessage.calledOnce);
      assert.ok(pure.git.commitSha.calledOnce);
    });

    it("returns a commit entry with internet email", function() {
      pure.git.commitEntry();

      assert.ok(pure.internet.email.calledOnce);
    });

    it("returns a commit entry with name first and last", function() {
      pure.git.commitEntry();

      assert.ok(pure.name.firstName.calledTwice);
      assert.ok(pure.name.lastName.calledTwice);
    });

    context("with options['merge'] equal to true", function() {
      beforeEach(function() {
        sinon.spy(pure.git, 'shortSha');
      });

      afterEach(function() {
        pure.git.shortSha.restore();
      });

      it("returns a commit entry with merge details", function() {
        pure.git.commitEntry({ merge: true });

        assert.ok(pure.git.shortSha.calledTwice);
      });
    });
  });

  describe("commitMessage()", function() {
    beforeEach(function() {
      sinon.spy(pure.hacker, 'verb');
      sinon.spy(pure.hacker, 'adjective');
      sinon.spy(pure.hacker, 'noun');
    });

    afterEach(function() {
      pure.hacker.verb.restore();
      pure.hacker.adjective.restore();
      pure.hacker.noun.restore();
    });

    it("returns a commit message with hacker noun, adj and verb", function() {
      pure.git.commitMessage();

      assert.ok(pure.hacker.verb.calledOnce);
      assert.ok(pure.hacker.adjective.calledOnce);
      assert.ok(pure.hacker.noun.calledOnce);
    });
  });


  describe("commitSha()", function() {
    it("returns a random commit SHA", function() {
      var commitSha = pure.git.commitSha();
      assert.ok(commitSha.match(/^[a-f0-9]{40}$/));
    });
  });

  describe("shortSha()", function() {
    it("returns a random short SHA", function() {
      var shortSha = pure.git.shortSha();
      assert.ok(shortSha.match(/^[a-f0-9]{7}$/));
    });
  });
});
