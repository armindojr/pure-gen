import sinon from 'sinon';
import pure from '../src/index.js';

describe('git.js', () => {
  describe('branch()', () => {
    beforeEach(() => {
      sinon.spy(pure.hacker, 'noun');
      sinon.spy(pure.hacker, 'verb');
    });

    afterEach(() => {
      pure.hacker.noun.restore();
      pure.hacker.verb.restore();
    });

    it('returns a branch with hacker noun and verb', () => {
      pure.git.branch();

      expect(pure.hacker.noun.calledOnce).toEqual(true);
      expect(pure.hacker.verb.calledOnce).toEqual(true);
    });
  });

  describe('commitEntry()', () => {
    beforeEach(() => {
      sinon.spy(pure.git, 'commitMessage');
      sinon.spy(pure.git, 'commitSha');
      sinon.spy(pure.internet, 'email');
      sinon.spy(pure.name, 'firstName');
      sinon.spy(pure.name, 'lastName');
      sinon.spy(pure.random, 'number');
    });

    afterEach(() => {
      pure.git.commitMessage.restore();
      pure.git.commitSha.restore();
      pure.internet.email.restore();
      pure.name.firstName.restore();
      pure.name.lastName.restore();
      pure.random.number.restore();
    });

    it('returns merge entry at random', () => {
      pure.git.commitEntry();

      expect(pure.random.number.called).toEqual(true);
    });

    it('returns a commit entry with git commit message and sha', () => {
      pure.git.commitEntry();

      expect(pure.git.commitMessage.calledOnce).toEqual(true);
      expect(pure.git.commitSha.calledOnce).toEqual(true);
    });

    it('returns a commit entry with internet email', () => {
      pure.git.commitEntry();

      expect(pure.internet.email.calledOnce).toEqual(true);
    });

    it('returns a commit entry with name first and last', () => {
      pure.git.commitEntry();

      expect(pure.name.firstName.calledTwice).toEqual(true);
      expect(pure.name.lastName.calledTwice).toEqual(true);
    });

    describe('with merge equal to true', () => {
      beforeEach(() => {
        sinon.spy(pure.git, 'shortSha');
      });

      afterEach(() => {
        pure.git.shortSha.restore();
      });

      it('returns a commit entry with merge details', () => {
        pure.git.commitEntry({ merge: true });

        expect(pure.git.shortSha.calledOnce).toEqual(true);
      });
    });
  });

  describe('commitMessage()', () => {
    beforeEach(() => {
      sinon.spy(pure.hacker, 'verb');
      sinon.spy(pure.hacker, 'adjective');
      sinon.spy(pure.hacker, 'noun');
    });

    afterEach(() => {
      pure.hacker.verb.restore();
      pure.hacker.adjective.restore();
      pure.hacker.noun.restore();
    });

    it('returns a commit message with hacker noun, adj and verb', () => {
      pure.git.commitMessage();

      expect(pure.hacker.verb.calledOnce).toEqual(true);
      expect(pure.hacker.adjective.calledOnce).toEqual(true);
      expect(pure.hacker.noun.calledOnce).toEqual(true);
    });
  });

  describe('commitSha()', () => {
    it('returns a random commit SHA', () => {
      const commitSha = pure.git.commitSha();

      expect(/^[a-f0-9]{40}$/.test(commitSha)).toEqual(true);
    });
  });

  describe('shortSha()', () => {
    it('returns a random short SHA', () => {
      const shortSha = pure.git.shortSha();

      expect(/^[a-f0-9]{7}$/.test(shortSha)).toEqual(true);
    });
  });
});
