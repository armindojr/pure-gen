const data = require('./sentences-data');

const sentences = {};
data.forEach((sentence) => {
    const normalized = sentence
        .replace(/^[а-яА-Я]/, ' ')
        .replace(/\s+/, ' ')
        .trim()
        .split(/\s+/);
    let count = 0;
    normalized.forEach((word) => {
        if (word.length > 3) {
            count++;
        }
    });
    if (!sentences[count]) {
        sentences[count] = [];
    }
    sentences[count].push(sentence);
});

module.exports = sentences;
