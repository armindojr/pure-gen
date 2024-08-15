import address from './address/index.js';
import company from './company/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Dutch (Belgium)';
const localeName = 'nl_BE';

export const nl_BE = {
  ...en,
  address,
  company,
  internet,
  name,
  phoneNumber,
  title,
  localeName
};
