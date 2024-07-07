import _ from 'lodash';

export function fCodeBooking(str) {
  return str ? str.slice(0, 8) : '';
}

export function fShortenString(str) {
  if(str) {
    if(str.length <= 11) {
      return str;
    }
    return _.concat(str.slice(0, 11), '...');
  }
  return '';
}