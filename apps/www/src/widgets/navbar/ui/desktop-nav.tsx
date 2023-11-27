import { fetchNavigation } from "entities/navigation";
import MegaMenuLink from "./mega-menu-link";
import DesktopLink from "./desktop-link";
import MegaMenu from "./mega-menu";

type NavigationProps = {
  locale: string;
};

export async function NavbarDesktopNav(props: NavigationProps) {
  const navigation = await fetchNavigation("main-navigation", props.locale);

  return (
    <nav className="hidden gap-5 lg:flex">
      {navigation.map((item) =>
        "items" in item && item.items?.length ? (
          <MegaMenu key={item.id} name={item.title}>
            {item.items.map((page) => "related" in page && <MegaMenuLink key={page.id} {...page.related} />)}
          </MegaMenu>
        ) : (
          <DesktopLink
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
