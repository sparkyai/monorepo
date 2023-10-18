const PARAMETERS_REGEX = /{(?<name>[A-zА-я0-9_ ]+)}/gm;

export function getParameters(prompt: string) {
  return Array.from(prompt.matchAll(PARAMETERS_REGEX)).map((match) => match[1].trim());
}

type Message = {
  content: string;
};

export function getTemplateParameters(messages: Message[]) {
  return messages
    .map((message) => getParameters(message.content))
    .flat()
    .filter((name, index, collection) => index === collection.indexOf(name));
}
