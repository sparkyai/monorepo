export function pick<T extends Record<PropertyKey, unknown>, K extends keyof T>(target: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = target[key];
  }

  return result;
}
