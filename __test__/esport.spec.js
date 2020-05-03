const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('esport.js', () => {
    describe('players()', () => {
        it('returns players name', () => {
            sinon.stub(pure.esport, 'players').returns('shroud');
            const players = pure.esport.players();

            assert.equal(players, 'shroud');
            pure.esport.players.restore();
        });
    });
    describe('teams()', () => {
        it('returns teams name', () => {
            sinon.stub(pure.esport, 'teams').returns('FaZe');
            const teams = pure.esport.teams();

            assert.equal(teams, 'FaZe');
            pure.esport.teams.restore();
        });
    });
    describe('events()', () => {
        it('returns events name', () => {
            sinon.stub(pure.esport, 'events').returns('ESL Cologne');
            const events = pure.esport.events();

            assert.equal(events, 'ESL Cologne');
            pure.esport.events.restore();
        });
    });
    describe('leagues()', () => {
        it('returns leagues name', () => {
            sinon.stub(pure.esport, 'leagues').returns('IEM');
            const leagues = pure.esport.leagues();

            assert.equal(leagues, 'IEM');
            pure.esport.leagues.restore();
        });
    });
    describe('games()', () => {
        it('returns games name', () => {
            sinon.stub(pure.esport, 'games').returns('CS:GO');
            const games = pure.esport.games();

            assert.equal(games, 'CS:GO');
            pure.esport.games.restore();
        });
    });
});
