import address from './address/index.js';
import company from './company/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'South Africa (English)';
const localeName = 'en_ZA';

export const en_ZA = {
  ...en,
  address,
  company,
  internet,
  name,
  phoneNumber,
  title,
  localeName
};
