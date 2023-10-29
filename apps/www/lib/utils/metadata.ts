import type { Metadata } from "next";

type Options = {
  url: string;
  image: {
    url: string | URL;
    alt?: string;
    type?: string;
    width?: string | number;
    height?: string | number;
  };
  title: string;
  locale: string;
  languages: Record<string, string>;
  description: string;
};

export function defineMetadata(options: Options) {
  const metadata: Metadata = {
    alternates: {
      canonical: options.url,
      languages: options.languages,
    },
  };

  metadata.twitter = {};
  metadata.openGraph = {
    type: "article",
    locale: options.locale,
    siteName: "Sparky",
  };

  // eslint-disable-next-line no-multi-assign -- controlled assign
  metadata.title = metadata.twitter.title = metadata.openGraph.title = options.title;
  // eslint-disable-next-line no-multi-assign -- controlled assign
  metadata.description = metadata.twitter.description = metadata.openGraph.description = options.description;

  // eslint-disable-next-line no-multi-assign -- controlled assign
  metadata.twitter.site = metadata.openGraph.url = options.url;
  // eslint-disable-next-line no-multi-assign -- controlled assign
  metadata.twitter.images = metadata.openGraph.images = options.image;

  return metadata;
}
