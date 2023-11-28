function env(key, _default) {
  const value = process.env[key];

  if (value || typeof _default === "string") {
    return value || _default;
  }

  throw new Error(`The environment variable "${key}" is not available`);
}

env.number = function number(key, _default) {
  const value = Number(env(key, String(_default)));

  if (!isNaN(value)) {
    return value;
  }

  throw new Error(`The environment variable "${key}" must be of type number`);
};

env.boolean = function boolean(key, _default) {
  const value = env(key, String(_default));

  if (["true", "false"].includes(value.toLowerCase().trim())) {
    return value === "true";
  }

  throw new Error(`The environment variable "${key}" must be of type boolean`);
};

module.exports = { env };
