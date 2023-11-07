const PRIMITIVE = {
  true: true,
  false: false,
  null: null,
  undefined,
};

type DefaultDecoder = (str: string, decoder?: never, charset?: string) => string;

export function decoder(value: string, defaultDecoder: DefaultDecoder, charset: string) {
  if (value in PRIMITIVE) {
    return PRIMITIVE[value];
  }

  const float = parseFloat(value);

  return isNaN(float) ? defaultDecoder(value, void 0, charset) : float;
}
