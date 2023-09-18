import dynamic from "next/dynamic";

const SECTIONS = {
  // "template-cards": dynamic(() => import("components/section/template-cards")),
  // Text_Image_DoubleCard: dynamic(() => import("components/section/template-cards")),
  // Horizontal_Detailed_Card_1280px: dynamic(() => import("components/section/template-cards")),
  // Advantages_list_card: dynamic(() => import("components/section/template-cards")),
  // Tabbed_Text_Video_Card: dynamic(() => import("components/section/template-cards")),
  // Banner: dynamic(() => import("components/section/template-cards")),
  // "company info": dynamic(() => import("components/section/template-cards")),
  // Hero_Image_AvatarDisplay: dynamic(() => import("components/section/template-cards")),
  // "Simple_Hero_&_Image": dynamic(() => import("components/section/template-cards")),
  // Multipurpose_Contact_Section: dynamic(() => import("components/section/template-cards")),
  // Services_Section_Top_Bottom: dynamic(() => import("components/section/template-cards")),
  // Services_Section_Left_Right: dynamic(() => import("components/section/template-cards")),
  // Tools_cards: dynamic(() => import("components/section/template-cards")),
  // Team_contact_cards: dynamic(() => import("components/section/template-cards")),
  // Team_banner_cards: dynamic(() => import("components/section/template-cards")),
  faq: dynamic(() => import("components/section/faq")),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
  // @ts-expect-error
  hero: dynamic(() => import("components/section/hero")),
  media: dynamic(() => import("components/section/media")),
  pricing: dynamic(() => import("components/section/pricing")),
  reviews: dynamic(() => import("components/section/reviews")),
  "hero-about": dynamic(() => import("components/section/hero-about")),
  advantages: dynamic(() => import("components/section/advantages")),
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
};

type PageSectionProps = {
  type: string;
  locale: string;
  params: object;
};

export default function PageSection(props: PageSectionProps) {
  const Component = SECTIONS[props.type];

  return <Component locale={props.locale} {...props.params} />;
}
