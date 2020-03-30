/**
 *
 * @namespace pure.music
 */
var Music = function (pure) {
    var self = this;
    /**
     * genre
     *
     * @method pure.music.genre
     */
    self.genre = function () {
        return pure.random.arrayElement(pure.definitions.music.genre);
    };

    self.genre.schema = {
        "description": "Generates a genre.",
        "sampleResults": ["Rock", "Metal", "Pop"]
    };
};

module["exports"] = Music;
