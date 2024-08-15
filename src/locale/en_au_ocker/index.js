import address from './address/index.js';
import company from './company/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Australia Ocker (English)';
const localeName = 'en_au_ocker';

export const en_au_ocker = {
  ...en,
  title,
  localeName,
  address,
  company,
  internet,
  name,
  phoneNumber
};
