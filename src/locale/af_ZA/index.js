import address from './address/index.js';
import company from './company/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'South Africa (Afrikaans)';
const localeName = 'af_ZA';

export const af_ZA = {
  ...en,
  title,
  localeName,
  address,
  company,
  internet,
  name,
  phoneNumber
};
