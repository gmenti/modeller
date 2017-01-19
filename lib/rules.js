/**
 * Check if value is not empty.
 *
 * @param  {*} value
 * @return {Boolean}
 */
const required = value => (value !== undefined && value !== null);

/**
 * Check if is type string.
 *
 * @param  {*} value
 * @return {Boolean}
 */
const string = value => (typeof value === 'string');

/**
 * Check if is type number.
 *
 * @param  {*} value
 * @return {Boolean}
 */
const number = value => (typeof value === 'number');

/**
 * Check if is integer.
 *
 * @param  {*} value
 * @return {Boolean}
 */
const integer = value => (number(value) && parseInt(value, 10) === value);

/**
 * Check if is float.
 *
 * @param  {*} value
 * @return {Boolean}
 */
const float = value => (number(value) && parseInt(value, 10) !== value);

/**
 * Check if the value is greater than or equal to minPermitted.
 *
 * @param  {*} value
 * @param  {Number} minPermitted
 * @return {Boolean}
 */
const min = (value, minPermitted) => (value >= minPermitted);

/**
 * Check if the value is smaller than or equal to maxPermitted.
 *
 * @param  {*} value
 * @param  {Number} maxPermitted
 * @return {Boolean}
 */
const max = (value, maxPermitted) => (value <= maxPermitted);

/**
 * Check if the size of value is between the parameters.
 *
 * @param  {*} value
 * @param  {Array} params
 * @return {Boolean}
 */
const size = (value, params) => (min(value, params[0]) && max(value, params[1]));

/**
 * Check if length of string is between the parameters.
 *
 * @param  {String} value
 * @param  {Array} params
 * @return {Boolean}
 */
const length = (value, params) => (min(value.length, params[0]) && max(value.length, params[1]));

/**
 * Check if value is a valid email.
 *
 * @param  {*} value
 * @return {Boolean}
 */
const email = value => new RegExp('.+@.+').test(value);

module.exports = {
  required,
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
