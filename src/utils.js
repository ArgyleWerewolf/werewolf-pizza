import { STRINGS, DEFAULT_LOCALE } from './constants.json';

export function label (key) {
  if (STRINGS[DEFAULT_LOCALE][key]) {
    return STRINGS[DEFAULT_LOCALE][key];
  }
  return key;
}
