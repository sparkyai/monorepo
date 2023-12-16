import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPageBySlug } from "entities/page";
import { fetchDictionary } from "entities/dictionary";
import RichText from "shared/ui/rich-text";
import { www } from "shared/lib/url";
import { defineMetadata } from "lib/utils/metadata";
import LastModified from "./last-modified";
import Section from "./section";

type PageProps = {
  params: {
    slug?: string[];
    locale: string;
  };
};

export async function generateMetadata(props: PageProps) {
  const page = await fetchPageBySlug(props.params.locale, ...(props.params.slug || [])).catch(() => null);

  if (page) {
    return defineMetadata({
      url: www(page.locale, ...(props.params.slug || [])),
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
        languages["x-default"] = www(localization.href.slice(1)).replace(`/${localization.locale}`, "");

        return languages;
      }, {}),
      description: page.seo.description,
    });
  }

  return {
    robots: {
      index: false,
      follow: false,
    },
  } satisfies Metadata;
}

export default async function Page(props: PageProps) {
  const [page, dictionary] = await Promise.all([
    fetchPageBySlug(props.params.locale, ...(props.params.slug || [])).catch(notFound),
    fetchDictionary(props.params.locale),
  ]);

  if (typeof page.content === "object") {
    return (
      <main className="shrink-0 grow">
        {page.content.map((section) => (
          <Section {...section} key={`${section.type}-${section.id}`} locale={props.params.locale} />
        ))}
      </main>
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
