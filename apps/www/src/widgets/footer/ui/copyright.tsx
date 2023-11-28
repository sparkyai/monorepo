import { fetchDictionary } from "entities/dictionary";

type CopyrightProps = {
  locale: string;
};

export default async function Copyright(props: CopyrightProps) {
  const dictionary = await fetchDictionary(props.locale);

  return (
    <p className="md:text-md text-sm text-gray-100 md:font-semibold">
      &copy; 2023 Sparky {dictionary["All rights reserved"]}.
    </p>
  );
}
