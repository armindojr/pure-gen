import address from './address/index.js';
import company from './company/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Nigeria (English)';
const localeName = 'en_NG';

export const en_NG = {
  ...en,
  address,
  company,
  internet,
  name,
  phoneNumber,
  localeName,
  title
};
