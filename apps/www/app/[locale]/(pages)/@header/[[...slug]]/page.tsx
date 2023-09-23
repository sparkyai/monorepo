import { getNavigation } from "lib/data/navigation";
import { app } from "lib/utils/url";
import Portal from "components/common/portal";
import ButtonBlueFilled from "components/button/button-blue-filled";
import ButtonGrayFilled from "components/button/button-gray-filled";
import { DropdownContent } from "components/common/dropdown";
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
  const [navigation, dictionary] = await Promise.all([
    getNavigation("main-navigation", props.params.locale),
    import(`lib/dictionaries/${props.params.locale}.json`).then((module) => module.default),
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
                  "items" in item && item.items?.length ? null : (
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
              <div className="flex gap-5 sm:hidden">
                <ButtonGrayFilled className="flex w-0 grow" component="a" href={app()}>
                  {dictionary.Login}
                </ButtonGrayFilled>
                <ButtonBlueFilled className="flex w-0 grow" component="a" href={app()}>
                  {dictionary["Try now"]}
                </ButtonBlueFilled>
              </div>
            </div>
          </div>
        </DropdownContent>
      </Portal>
    </>
  );
}
