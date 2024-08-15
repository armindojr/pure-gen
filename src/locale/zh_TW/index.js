import address from './address/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Chinese (Taiwan)';
const localeName = 'zh_TW';

export const zh_TW = {
  ...en,
  address,
  name,
  phoneNumber,
  title,
  localeName
};
