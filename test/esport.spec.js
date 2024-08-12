import sinon from 'sinon';
import pure from '../index.js';

describe('esport.js', () => {
  describe('players()', () => {
    it('returns players name', () => {
      const players = pure.esport.players();

      expect(players).toBeDefined();
    });

    it('returns exact player name stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'esport').get(() => ({
        players: ['shroud']
      }));

      const players = pure.esport.players();

      expect(players).toEqual('shroud');

      stub.restore();
    });
  });

  describe('teams()', () => {
    it('returns teams name', () => {
      const teams = pure.esport.teams();

      expect(teams).toBeDefined();
    });

    it('returns exact teams name stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'esport').get(() => ({
        teams: ['FaZe']
      }));

      const teams = pure.esport.teams();

      expect(teams).toEqual('FaZe');

      stub.restore();
    });
  });

  describe('events()', () => {
    it('returns events name', () => {
      const events = pure.esport.events();

      expect(events).toBeDefined();
    });

    it('returns exact events name stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'esport').get(() => ({
        events: ['ESL Cologne']
      }));

      const events = pure.esport.events();

      expect(events).toEqual('ESL Cologne');

      stub.restore();
    });
  });

  describe('leagues()', () => {
    it('returns leagues name', () => {
      const leagues = pure.esport.leagues();

      expect(leagues).toBeDefined();
    });

    it('returns exact leagues name stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'esport').get(() => ({
        leagues: ['IEM']
      }));

      const leagues = pure.esport.leagues();

      expect(leagues).toEqual('IEM');

      stub.restore();
    });
  });

  describe('games()', () => {
    it('returns games name', () => {
      const games = pure.esport.games();

      expect(games).toBeDefined();
    });

    it('returns exact games name stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'esport').get(() => ({
        games: ['CS:GO']
      }));

      const games = pure.esport.games();

      expect(games).toEqual('CS:GO');

      stub.restore();
    });
  });
});
