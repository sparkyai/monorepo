export declare interface Seo {
  image: Image;
  title: string;
  description: string;
}

export declare interface Page {
  id: number;
  seo: Seo;
  name: string;
  slug: string;
  title: string;
  locale: string;
  content: Section[] | string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  localizations: Localization[];
}

export declare interface Image {
  src: string;
  alt: string;
  name: string;
  mime: string;
  width: number;
  height: number;
  placeholder: string;
}

export declare interface Section {
  id: string;
  type: string;
  params: Record<string, unknown>;
}

export declare interface Localization {
  id: number;
  name: string;
  href: string;
  locale: string;
}

export declare interface PageMetadata {
  href: string;
  updatedAt: string;
}
