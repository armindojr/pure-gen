import sinon from 'sinon';
import pure from '../src/index.js';

describe('music.js', () => {
  describe('genre()', () => {
    it('returns a genre', () => {
      const genre = pure.music.genre();

      expect(genre).toBeDefined();
    });

    it('returns exact genre stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'music').get(() => ({
        genre: ['Rock']
      }));

      const genre = pure.music.genre();

      expect(genre).toEqual('Rock');

      stub.restore();
    });
  });
});
