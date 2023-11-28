import { DropdownTrigger, DropdownRoot, DropdownContent } from "shared/ui/dropdown";
import { Navbar, NavbarDesktopNav, NavbarMobileNav } from "widgets/navbar";
import { LocalizationDropdown } from "features/localization";
import DonationLink from "features/donation-link";
import Portal from "shared/ui/portal";

type DefaultNavbarProps = {
  params: {
    slug?: string[];
    locale: string;
  };
};

export default function DefaultNavbar(props: DefaultNavbarProps) {
  return (
    <DropdownRoot>
      <Navbar locale={props.params.locale}>
        <NavbarDesktopNav locale={props.params.locale} />
        <div className="flex items-start gap-2.5">
          <LocalizationDropdown locale={props.params.locale} path={props.params.slug || []} />
          <DonationLink className="hidden sm:inline-flex" locale={props.params.locale} />
          <DropdownTrigger
            aria-label="Menu"
            className="relative h-12 w-12 cursor-pointer rounded-sm border border-transparent bg-transparent text-lg font-semibold leading-5 transition-colors hover:border-gray-300 hover:bg-gray-300 active:border-gray-300 active:bg-gray-300 lg:hidden first:[&_span]:aria-expanded:mt-0 first:[&_span]:aria-expanded:rotate-45 last:[&_span]:aria-expanded:mt-0 last:[&_span]:aria-expanded:-rotate-45 even:[&_span]:aria-expanded:opacity-0"
          >
            <span className="absolute left-1/2 top-1/2 -mt-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-y border-blue-50 transition-all duration-500" />
            <span className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-y border-blue-50 transition-opacity duration-500" />
            <span className="absolute left-1/2 top-1/2 mt-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-y border-blue-50 transition-all duration-500" />
          </DropdownTrigger>
        </div>
        <Portal>
          <DropdownContent className="fixed inset-0 overflow-hidden bg-gray-900/95">
            <div className="container h-screen pb-5 pt-24">
              <div className="flex h-full flex-col gap-5">
                <NavbarMobileNav locale={props.params.locale} />
                <DonationLink className="sm:hidden" locale={props.params.locale} />
              </div>
            </div>
          </DropdownContent>
        </Portal>
      </Navbar>
    </DropdownRoot>
  );
}
