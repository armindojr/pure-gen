import address from './address/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'German (Switzerland)';
const localeName = 'de_CH';

export const de_CH = {
  ...en,
  title,
  localeName,
  address,
  internet,
  name,
  phoneNumber
};
