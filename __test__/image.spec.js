const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('image.js', () => {
    describe('placeimg()', () => {
        describe('imageUrl()', () => {
            it('returns a random image url from placeimg', () => {
                const imageUrl = pure.image.placeimg.imageUrl();

                assert.equal(imageUrl, 'https://placeimg.com/640/480');
            });
            it('returns a random image url from placeimg with width and height', () => {
                const imageUrl = pure.image.placeimg.imageUrl({ width: 100, height: 100 });

                assert.equal(imageUrl, 'https://placeimg.com/100/100');
            });
            it('returns a random image url for a specified category', () => {
                const imageUrl = pure.image.placeimg.imageUrl({ width: 100, height: 100, category: 'abstract' });

                assert.equal(imageUrl, 'https://placeimg.com/100/100/abstract');
            });
        });
        describe('avatar()', () => {
            it('return a random avatar from UIFaces', () => {
                assert.include(pure.image.placeimg.avatar(), 'https://i.pravatar.cc');
            });
        });
        describe('animals()', () => {
            it('returns a random animals image url', () => {
                const animals = pure.image.placeimg.animals();
                assert.equal(animals, 'https://placeimg.com/640/480/animals');
            });
        });
        describe('architecture()', () => {
            it('returns a random architecture image url', () => {
                const architecture = pure.image.placeimg.architecture();
                assert.equal(architecture, 'https://placeimg.com/640/480/arch');
            });
        });
        describe('nature()', () => {
            it('returns a random nature image url', () => {
                const nature = pure.image.placeimg.nature();
                assert.equal(nature, 'https://placeimg.com/640/480/nature');
            });
        });
        describe('people()', () => {
            it('returns a random people image url', () => {
                const people = pure.image.placeimg.people();
                assert.equal(people, 'https://placeimg.com/640/480/people');
            });
        });
        describe('tech()', () => {
            it('returns a random tech image url', () => {
                const tech = pure.image.placeimg.tech();
                assert.equal(tech, 'https://placeimg.com/640/480/tech');
            });
        });
        describe('image()', () => {
            it('returns a random category from placeimg', () => {
                const category = pure.image.placeimg.image();

                assert.typeOf(category, 'string');
            });
        });
    });

    describe('unsplash()', () => {
        describe('imageUrl()', () => {
            it('returns a random avatar url from unsplash', () => {
                const avatar = pure.image.unsplash.avatar();

                expect(avatar).to.contain('https://i.pravatar.cc');
            });
            it('returns a random image url from unsplash', () => {
                const imageUrl = pure.image.unsplash.imageUrl();

                assert.equal(imageUrl, 'https://source.unsplash.com/640x480');
            });
            it('returns a random image url from unsplash with width and height', () => {
                const imageUrl = pure.image.unsplash.imageUrl({ width: 100, height: 100 });

                assert.equal(imageUrl, 'https://source.unsplash.com/100x100');
            });
        });
        describe('image()', () => {
            it('returns a searching image url with keyword', () => {
                const food = pure.image.unsplash.image({ width: 100, height: 200, keyword: 'keyword1,keyword2,keyword3' });
                assert.equal(food, 'https://source.unsplash.com/100x200?keyword1,keyword2,keyword3');
            });
        });
        describe('food()', () => {
            it('returns a random food image url', () => {
                const food = pure.image.unsplash.food();
                assert.equal(food, 'https://source.unsplash.com/640x480?food');
            });
        });
        describe('people()', () => {
            it('returns a random people image url', () => {
                const people = pure.image.unsplash.people();
                assert.equal(people, 'https://source.unsplash.com/640x480?people');
            });
        });
        describe('nature()', () => {
            it('returns a random nature image url', () => {
                const nature = pure.image.unsplash.nature();
                assert.equal(nature, 'https://source.unsplash.com/640x480?nature');
            });
        });
        describe('technology()', () => {
            it('returns a random technology image url', () => {
                const transport = pure.image.unsplash.technology();
                assert.equal(transport, 'https://source.unsplash.com/640x480?technology');
            });
        });
        describe('objects()', () => {
            it('returns a random objects image url', () => {
                const transport = pure.image.unsplash.objects();
                assert.equal(transport, 'https://source.unsplash.com/640x480?objects');
            });
        });
        describe('buildings()', () => {
            it('returns a random buildings image url', () => {
                const transport = pure.image.unsplash.buildings();
                assert.equal(transport, 'https://source.unsplash.com/640x480?buildings');
            });
        });
    });

    describe('dataUri', () => {
        it('returns a blank data', () => {
            sinon.stub(pure.commerce, 'color').returns('grey');
            const dataUri = pure.image.dataUri({ width: 200, height: 300 });
            assert.equal(dataUri, 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2F'
            + 'www.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%2'
            + '2200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20'
            + 'fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20'
            + 'alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200'
            + 'x300%3C%2Ftext%3E%3C%2Fsvg%3E');
            pure.commerce.color.restore();
        });
        it('returns a customed background color data URI', () => {
            const dataUri = pure.image.dataUri({ width: 200, height: 300, color: 'red' });
            assert.equal(dataUri, 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2F'
            + 'www.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%'
            + '22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20'
            + 'fill%3D%22red%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20'
            + 'alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200'
            + 'x300%3C%2Ftext%3E%3C%2Fsvg%3E');
        });
        it('returns data uri even when parameters is undefined', () => {
            sinon.stub(pure.commerce, 'color').returns('grey');
            const dataUri = pure.image.dataUri();
            assert.equal(dataUri, 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2F'
            + 'www.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%'
            + '22640%22%20height%3D%22480%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20'
            + 'fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22240%22%20font-size%3D%2220%22%20'
            + 'alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E640'
            + 'x480%3C%2Ftext%3E%3C%2Fsvg%3E');
            pure.commerce.color.restore();
        });
    });
});
