import { fetchNavigation } from "entities/navigation";
import CollapsibleMenu from "./collapsible-menu";
import MobileLink from "./mobile-link";

type NavigationProps = {
  locale: string;
};

export async function NavbarMobileNav(props: NavigationProps) {
  const navigation = await fetchNavigation("main-navigation", props.locale);

  return (
    <nav className="grow overflow-y-auto">
      {navigation.map((item) =>
        "items" in item && item.items?.length ? (
          <CollapsibleMenu key={item.id} name={item.title}>
            {item.items.map(
              (page) =>
                "related" in page && (
                  <MobileLink
                    external={page.external}
                    href={page.related?.href || page.path}
                    key={page.id}
                    locale={props.locale}
                    name={page.related?.name || page.title}
                  />
                ),
            )}
          </CollapsibleMenu>
        ) : (
          <MobileLink
            external={item.external}
            href={item.related?.href || item.path}
            key={item.id}
            locale={props.locale}
            name={item.related?.name || item.title}
          />
        ),
      )}
    </nav>
  );
}
