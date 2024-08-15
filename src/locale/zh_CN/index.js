import address from './address/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Chinese';
const localeName = 'zh_CN';

export const zh_CN = {
  ...en,
  address,
  name,
  phoneNumber,
  title,
  localeName
};
