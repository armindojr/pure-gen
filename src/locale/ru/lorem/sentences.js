import data from './sentencesData.js';

const sentences = {};

data.forEach(e => {
  const s = e
    .replace(/^[а-яА-Я]/, ' ')
    .replace(/\s+/, ' ')
    .trim()
    .split(/\s+/);
  let t = 0;
  s.forEach(e => {
    e.length > 3 && t++;
  }),
    sentences[t] || (sentences[t] = []),
    sentences[t].push(e);
});

export default sentences;
