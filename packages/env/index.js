/**
 * @param {string} key
 * @return {string}
 */
function env(key) {
  return process.env[key] || "";
}

/**
 * @param {string} key
 * @return {number}
 */
env.number = function number(key) {
  return Number(env(key));
};

/**
 * @param {string} key
 * @return {boolean}
 */
env.boolean = function boolean(key) {
  const value = env(key);

  return Boolean(value) && value !== "false";
};

module.exports = { env };
