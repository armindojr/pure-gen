class Placeimg {
    constructor(pure) {
        this.pure = pure;
        this.width = 640;
        this.height = 480;
    }

    image(options = {}) {
        const { width, height } = options;

        const categories = [
            'animals',
            'architecture',
            'nature',
            'people',
            'tech',
        ];

        return this[this.pure.random.arrayElement(categories)](width, height);
    }

    avatar() {
        return this.pure.internet.avatar();
    }

    imageUrl(options = {}) {
        const {
            width = this.width, height = this.height, category,
        } = options;
        let url = `https://placeimg.com/${width}/${height}`;

        if (typeof category !== 'undefined') {
            url += `/${category}`;
        }

        return url;
    }

    animals(options = {}) {
        const { width, height } = options;
        return this.imageUrl({
            width, height, category: 'animals',
        });
    }

    architecture(options = {}) {
        const { width, height } = options;
        return this.imageUrl({
            width, height, category: 'arch',
        });
    }

    nature(options = {}) {
        const { width, height } = options;
        return this.imageUrl({
            width, height, category: 'nature',
        });
    }

    people(options = {}) {
        const { width, height } = options;
        return this.imageUrl({
            width, height, category: 'people',
        });
    }

    tech(options = {}) {
        const { width, height } = options;
        return this.imageUrl({
            width, height, category: 'tech',
        });
    }
}

module.exports = Placeimg;
