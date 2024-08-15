import lorem from './lorem/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Bork (English)';
const localeName = 'en_BORK';

export const en_BORK = {
  ...en,
  title,
  localeName,
  lorem
};
