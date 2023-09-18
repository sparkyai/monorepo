import Section from "components/layout/section";
import HeaderContainer from "components/layout/header-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/common/tabs";
import VideoPlaceholder from "components/common/video-placeholder";

type CategoryShowcaseProps = {
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  categories: {
    id: number;
    name: string;
    title: string;
    preview: {
      name: string;
    };
    description: string;
  }[];
};

export default function CategoryShowcase(props: CategoryShowcaseProps) {
  return (
    <Section>
      <HeaderContainer {...props.header} />
      {props.categories.length > 0 && (
        <Tabs
          className="container flex flex-col gap-5 sm:gap-8 xl:gap-12"
          defaultValue={props.categories[0].id.toString()}
        >
          <TabsList>
            <div className="flex flex-wrap gap-y-5">
              {props.categories.map((category) => (
                <div className="w-6/12 px-2.5 sm:w-4/12 md:w-3/12 lg:w-auto" key={category.id}>
                  <TabsTrigger aria-label={category.name} className="w-full" value={category.id.toString()}>
                    {category.name}
                  </TabsTrigger>
                </div>
              ))}
            </div>
          </TabsList>
          <div className="relative">
            {props.categories.map((category) => (
              <TabsContent
                className="radix-state-inactive:absolute radix-state-inactive:inset-0 radix-state-inactive:pointer-events-none radix-state-inactive:opacity-0 transition-opacity duration-700"
                forceMount
                key={category.id}
                value={category.id.toString()}
              >
                <div className="flex flex-col overflow-hidden rounded-sm bg-gray-600 lg:flex-row">
                  <div className="flex flex-col gap-5 bg-blue-100 p-5 text-gray-800 lg:w-1/2 lg:p-7">
                    <h3 className="text-md font-semibold sm:text-lg md:text-2xl">{category.title}</h3>
                    <p className="sm:text-md text-sm md:text-lg md:font-medium">{category.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-8 p-12 lg:w-1/2">
                    <h4 className="text-md text-center font-semibold sm:w-7/12 sm:text-lg md:text-2xl lg:w-10/12 xl:w-8/12">
                      {category.preview.name}
                    </h4>
                    <div className="flex aspect-video w-full overflow-hidden rounded-lg sm:max-w-sm">
                      <VideoPlaceholder />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}
      {/*{props.categories.data.length > 0 && (*/}
      {/*  <Container>*/}
      {/*    <Tabs defaultValue={props.categories.data[0].id.toString()} className="flex flex-col gap-5">*/}
      {/*      <TabsList>*/}
      {/*        <div className="flex flex-wrap gap-y-5">*/}
      {/*          {props.categories.data.map(({ id, attributes: { name } }) => (*/}
      {/*            <div key={id} className="w-6/12 px-2.5 sm:w-4/12 md:w-3/12 lg:w-auto">*/}
      {/*              <TabsTrigger value={id.toString()} className="w-full" aria-label={name}>*/}
      {/*                {name}*/}
      {/*              </TabsTrigger>*/}
      {/*            </div>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </TabsList>*/}
      {/*      <div className="relative">*/}
      {/*        {props.categories.data.map(({ id, attributes: { title, preview, description } }) => (*/}
      {/*          <TabsContent*/}
      {/*            key={id}*/}
      {/*            value={id.toString()}*/}
      {/*            className={`radix-state-inactive:absolute radix-state-inactive:inset-0 radix-state-inactive:pointer-events-none radix-state-inactive:opacity-0 transition-opacity duration-700`}*/}
      {/*            forceMount*/}
      {/*          >*/}
      {/*            <div className="flex flex-col overflow-hidden rounded-sm bg-gray-600 lg:flex-row">*/}
      {/*              <div className="flex flex-col gap-5 bg-blue-100 p-5 text-gray-800 lg:w-1/2 lg:p-7">*/}
      {/*                <h3 className="text-md font-semibold sm:text-lg md:text-2xl">{title}</h3>*/}
      {/*                <p className="sm:text-md text-sm md:text-lg md:font-medium">{description}</p>*/}
      {/*              </div>*/}
      {/*              <div className="flex flex-col items-center gap-8 p-12 lg:w-1/2">*/}
      {/*                <h4 className="text-md text-center font-semibold sm:w-7/12 sm:text-lg md:text-2xl lg:w-10/12 xl:w-8/12">*/}
      {/*                  {preview.name}*/}
      {/*                </h4>*/}
      {/*                <div className="flex aspect-video w-full overflow-hidden rounded-lg sm:max-w-sm">*/}
      {/*                  <VideoPlaceholder />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </TabsContent>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </Tabs>*/}
      {/*  </Container>*/}
      {/*)}*/}
    </Section>
  );
}
