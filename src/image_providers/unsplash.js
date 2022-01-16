class Unsplash {
    constructor(pure) {
        this.pure = pure;
        this.width = 640;
        this.height = 480;
    }

    image(options = {}) {
        const { width, height, keyword } = options;
        return this.imageUrl({ width, height, keyword });
    }

    avatar() {
        return this.pure.internet.avatar();
    }

    imageUrl(options = {}) {
        const { width = this.width, height = this.height, keyword } = options;
        let url = 'https://source.unsplash.com';

        url += `/${width}x${height}`;

        if (typeof keyword !== 'undefined') {
            const keywordFormat = /^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$/;
            if (keywordFormat.test(keyword)) {
                url += `?${keyword}`;
            }
        }

        return url;
    }

    food(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'food' });
    }

    people(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'people' });
    }

    nature(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'nature' });
    }

    technology(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'technology' });
    }

    objects(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'objects' });
    }

    buildings(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'buildings' });
    }
}

module.exports = Unsplash;
