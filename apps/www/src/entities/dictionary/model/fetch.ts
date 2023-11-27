export async function fetchDictionary(locale: string) {
  return import(`../const/${locale}.json`).then(
    (module) => module.default,
    () => ({}),
  );
}
