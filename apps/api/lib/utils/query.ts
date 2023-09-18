export function pickSearchParams(target: URLSearchParams, ...params: string[]) {
  const result = new URLSearchParams();

  for (const param of params) {
    const value = target.get(param);

    if (value) {
      result.set(param, value);
    }
  }

  return result;
}
