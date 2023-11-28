import Brand from "shared/ui/brand";
import { fetchNavigation } from "entities/navigation";
import { fetchAllSocials } from "entities/social";
import LongText from "shared/ui/logn-text";
import IcomoonIcon from "entities/icomoon";
import { fetchFooter } from "../model/fetch";
import Group from "./group";
import Link from "./link";

type ContentProps = {
  locale: string;
};

export default async function Content(props: ContentProps) {
  const [footer, navigation, socials] = await Promise.all([
    fetchFooter(props.locale),
    fetchNavigation("footer-navigation", props.locale),
    fetchAllSocials(props.locale),
  ]);

  return (
    <div className="container grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-12">
      <div className="col-span-2 mb-8 sm:col-span-3 lg:col-span-5 lg:mb-0">
        <Brand locale={props.locale} />
        <LongText className="mt-4 text-sm text-gray-100">{footer.text}</LongText>

        <div className="mt-6 flex gap-5">
          {socials.map((social) => (
            <a
              aria-label={social.name}
              className="transition-colors hover:text-blue-200 active:text-blue-200"
              href={social.url}
              key={social.id}
              rel="noreferrer"
              target="_blank"
              title={social.name}
            >
              <IcomoonIcon className="text-[1.5rem]" name={social.name.toLowerCase()} />
            </a>
          ))}
        </div>
      </div>
      <div className="col-span-1 hidden lg:block" />
      {navigation.map(
        (group) =>
          "items" in group && (
            <Group key={group.id} name={group.title}>
              {group.items.map(
                (item) =>
                  "related" in item &&
                  item.related && (
                    <Link href={item.related.href} key={item.id}>
                      {item.related.name}
                    </Link>
                  ),
              )}
            </Group>
          ),
      )}
    </div>
  );
}
