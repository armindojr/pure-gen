const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('esport.js', () => {
    describe('players()', () => {
        it('returns players name', () => {
            const players = pure.esport.players();

            assert.ok(players);
        });

        it('returns exact player name stubbed', () => {
            sinon.stub(pure.esport, 'players').returns('shroud');
            const players = pure.esport.players();

            assert.equal(players, 'shroud');
            pure.esport.players.restore();
        });
    });
    describe('teams()', () => {
        it('returns teams name', () => {
            const teams = pure.esport.teams();

            assert.ok(teams);
        });

        it('returns exact teams name stubbed', () => {
            sinon.stub(pure.esport, 'teams').returns('FaZe');
            const teams = pure.esport.teams();

            assert.equal(teams, 'FaZe');
            pure.esport.teams.restore();
        });
    });
    describe('events()', () => {
        it('returns events name', () => {
            const events = pure.esport.events();

            assert.ok(events);
        });

        it('returns exact events name stubbed', () => {
            sinon.stub(pure.esport, 'events').returns('ESL Cologne');
            const events = pure.esport.events();

            assert.equal(events, 'ESL Cologne');
            pure.esport.events.restore();
        });
    });
    describe('leagues()', () => {
        it('returns leagues name', () => {
            const leagues = pure.esport.leagues();

            assert.ok(leagues);
        });

        it('returns exact leagues name stubbed', () => {
            sinon.stub(pure.esport, 'leagues').returns('IEM');
            const leagues = pure.esport.leagues();

            assert.equal(leagues, 'IEM');
            pure.esport.leagues.restore();
        });
    });
    describe('games()', () => {
        it('returns games name', () => {
            const games = pure.esport.games();

            assert.ok(games);
        });

        it('returns exact games name stubbed', () => {
            sinon.stub(pure.esport, 'games').returns('CS:GO');
            const games = pure.esport.games();

            assert.equal(games, 'CS:GO');
            pure.esport.games.restore();
        });
    });
});
