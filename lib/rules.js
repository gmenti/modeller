/**
 * Check if is type string.
 *
 * @param  {*} value
 * @return {boolean}
 */
const string = value => (typeof value === 'string');

/**
 * Check if is type number.
 *
 * @param  {*} value
 * @return {boolean}
 */
const number = value => (typeof value === 'number');

/**
 * Check if is integer.
 *
 * @param  {*} value
 * @return {boolean}
 */
const integer = value => (number(value) && parseInt(value, 10) === value);

/**
 * Check if is float.
 *
 * @param  {*} value
 * @return {boolean}
 */
const float = value => (number(value) && parseInt(value, 10) !== value);

/**
 * Check if the value is greater than or equal to minPermitted.
 *
 * @param  {*} value
 * @param  {number} minPermitted
 * @return {boolean}
 */
const min = (value, minPermitted) => (value >= minPermitted);

/**
 * Check if the value is smaller than or equal to maxPermitted.
 *
 * @param  {*} value
 * @param  {number} maxPermitted
 * @return {boolean}
 */
const max = (value, maxPermitted) => (value <= maxPermitted);

/**
 * Check if the size of value is between the parameters.
 *
 * @param  {*} value
 * @param  {array} params
 * @return {boolean}
 */
const size = (value, params) => (min(value, params[0]) && max(value, params[1]));

/**
 * Check if length of string is between the parameters.
 *
 * @param  {string} value
 * @param  {array} params
 * @return {boolean}
 */
const length = (value, params) => (min(value.length, params[0]) && max(value.length, params[1]));

/**
 * Check if value is a valid email.
 *
 * @param  {*} value
 * @return {boolean}
 */
const email = (value) => (new RegExp('.+\@.+').test(value));

module.exports = {
  string,
  number,
  integer,
  float,
  min,
  max,
  size,
  length,
  email,
};
