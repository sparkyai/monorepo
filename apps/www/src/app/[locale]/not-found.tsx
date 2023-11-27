import { cookies } from "next/headers";
import NextImage from "next/image";
import { LOCALIZATION_COOKIE_NAME } from "features/localization";
import { fetchAllLanguages } from "entities/language";
import { fetchDictionary } from "entities/dictionary";
import Cloud from "./cloud.svg";
import Actions from "./actions";

export default async function PageNotFound() {
  let locale = cookies().get(LOCALIZATION_COOKIE_NAME)?.value;

  if (!locale) {
    const locales = await fetchAllLanguages();

    for (const item of locales) {
      if (item.isDefault) {
        locale = item.code;
        break;
      }
    }
  }

  const dictionary = await fetchDictionary(locale || "en");

  return (
    <div className="container my-auto flex flex-col gap-8 md:flex-row-reverse md:items-center md:justify-center">
      <div className="md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12">
        <NextImage alt={dictionary["Page not found"]} className="md:h-full md:w-full" src={Cloud} />
      </div>
      <div>
        <p className="font-semibold text-blue-300">404 {dictionary.error}</p>
        <p className="pb-4 pt-3 text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          {dictionary["Page not found"]}
        </p>
        <p className="text-lg text-gray-100 md:text-xl">
          {dictionary["Sorry, the page you are looking for doesn't exist"]}.
          <br />
          {dictionary["Here are some helpful links:"]}
        </p>
        <Actions label={{ home: dictionary["Take me home"], back: dictionary["Go back"] }} />
      </div>
    </div>
  );
}
