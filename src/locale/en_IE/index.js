import address from './address/index.js';
import internet from './internet/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Ireland (English)';
const localeName = 'en_IE';

export const en_IE = {
  ...en,
  title,
  localeName,
  address,
  internet,
  phoneNumber
};
