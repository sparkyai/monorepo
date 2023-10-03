import NextLink from "next/link";
import { getNavigation } from "lib/data/navigation";
import Portal from "components/common/portal";
import ButtonBlueFilled from "components/button/button-blue-filled";
import { DropdownContent } from "components/common/dropdown";
import { getDonationLinkData } from "lib/data/donation-link";
import CollapsibleMenu from "./collapsible-menu";
import MegaMenuLink from "./mega-menu-link";
import DesktopLink from "./desktop-link";
import MobileLink from "./mobile-link";
import MegaMenu from "./mega-menu";

type PageHeaderProps = {
  params: {
    locale: string;
  };
};

export default async function PageHeader(props: PageHeaderProps) {
  const [roadmap, navigation] = await Promise.all([
    getDonationLinkData(props.params.locale),
    getNavigation("main-navigation", props.params.locale),
  ]);

  return (
    <>
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
              locale={props.params.locale}
              name={item.related?.name || item.title}
            />
          ),
        )}
      </nav>
      <Portal>
        <DropdownContent className="fixed inset-0 overflow-hidden bg-gray-900/95">
          <div className="container h-screen pb-5 pt-24">
            <div className="flex h-full flex-col gap-5">
              <div className="grow overflow-y-auto">
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
                              locale={props.params.locale}
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
                      locale={props.params.locale}
                      name={item.related?.name || item.title}
                    />
                  ),
                )}
              </div>
              {roadmap && (
                <ButtonBlueFilled
                  className="sm:hidden"
                  component={NextLink}
                  href={`/${roadmap.page.locale}${roadmap.page.slug ? `/${roadmap.page.slug}` : ""}`}
                >
                  {roadmap.label}
                </ButtonBlueFilled>
              )}
            </div>
          </div>
        </DropdownContent>
      </Portal>
    </>
  );
}
