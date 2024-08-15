import address from './address/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Japanese';
const localeName = 'ja';

export const ja = {
  ...en,
  address,
  lorem,
  name,
  phoneNumber,
  title,
  localeName
};
