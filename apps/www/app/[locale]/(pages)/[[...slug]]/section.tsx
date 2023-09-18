import dynamic from "next/dynamic";

const SECTIONS = {
  faq: dynamic(() => import("components/section/faq")),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
  // @ts-expect-error
  hero: dynamic(() => import("components/section/hero")),
  media: dynamic(() => import("components/section/media")),
  pricing: dynamic(() => import("components/section/pricing")),
  reviews: dynamic(() => import("components/section/reviews")),
  advantages: dynamic(() => import("components/section/advantages")),
  "hero-about": dynamic(() => import("components/section/hero-about")),
  "tools-cards": dynamic(() => import("components/section/tools-cards")),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
  // @ts-expect-error
  "promo-banner": dynamic(() => import("components/section/promo-banner")),
  "team-details": dynamic(() => import("components/section/team-details")),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
  // @ts-expect-error
  "team-preview": dynamic(() => import("components/section/team-preview")),
  "hero-pricing": dynamic(() => import("components/section/hero-pricing")),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
  // @ts-expect-error
  "hero-contacts": dynamic(() => import("components/section/hero-contacts")),
  "about-company": dynamic(() => import("components/section/about-company")),
  "about-us-info": dynamic(() => import("components/section/about-us-info")),
  "about-category": dynamic(() => import("components/section/about-category")),
  "contact-banner": dynamic(() => import("components/section/contact-banner")),
  "category-showcase": dynamic(() => import("components/section/category-showcase")),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
  // @ts-expect-error
  "template-showcase": dynamic(() => import("components/section/template-showcase")),
  "services-section-left-right": dynamic(() => import("components/section/media-horizontal")),
};

type PageSectionProps = {
  type: string;
  locale: string;
  params: object;
};

export default function PageSection(props: PageSectionProps) {
  const Component = SECTIONS[props.type];

  if (!Component) {
    return <pre>{JSON.stringify(props, void 0, 2)}</pre>;
  }

  return Component ? <Component locale={props.locale} {...props.params} /> : null;
}
