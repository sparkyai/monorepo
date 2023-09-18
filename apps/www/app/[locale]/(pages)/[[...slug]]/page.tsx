import { getPageData } from "lib/data/page";
import { www } from "lib/utils/url";
import { defineMetadata } from "lib/utils/metadata";
import RichText from "components/common/rich-text";
import LastModified from "./last-modified";
import PageSection from "./section";

type PageProps = {
  params: {
    slug?: string[];
    locale: string;
  };
};

export async function generateMetadata(props: PageProps) {
  const page = await getPageData(props.params.slug || [], props.params.locale);

  return defineMetadata({
    url: www(page.locale, page.slug),
    image: {
      url: page.seo.image.src,
      alt: page.seo.image.alt,
      type: page.seo.image.mime,
      width: page.seo.image.width,
      height: page.seo.image.height,
    },
    title: page.seo.title,
    locale: page.locale,
    languages: page.localizations.reduce((languages: Record<string, string>, localization) => {
      languages[localization.locale] = www(localization.href.slice(1));

      return languages;
    }, {}),
    description: page.seo.description,
  });
}

export default async function Page(props: PageProps) {
  const [page, dictionary] = await Promise.all([
    getPageData(props.params.slug || [], props.params.locale),
    import(`lib/dictionaries/${props.params.locale}.json`).then((module) => module.default),
  ]);

  if (typeof page.content === "object") {
    return (
      <>
        {page.content.map((section) => (
          <PageSection key={`${section.type}-${section.id}`} locale={props.params.locale} {...section} />
        ))}
      </>
    );
  }

  return (
    <main className="flex flex-col pt-24 md:pt-48">
      <p className="text-md container text-center font-semibold">
        {dictionary["Current as of"]} <LastModified locale={props.params.locale} updatedAt={new Date(page.updatedAt)} />
      </p>
      <RichText className="prose prose-legal md:prose-lg container mx-auto mt-2">
        {JSON.parse(page.content as string)}
      </RichText>
    </main>
  );
}
