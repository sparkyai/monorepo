import NextImage from "next/image";
import ButtonBlueFilled from "components/button/button-blue-filled";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
// import NumberField from "./number-field";
// import SelectField from "./select-field";
// import TextField from "./text-field";
//
// const FIELDS = {
//   ComponentFieldText: TextField,
//   ComponentFieldSelect: SelectField,
//   ComponentFieldNumber: NumberField,
// };

type FormProps = {
  icon: ImageData;
  name: string;
  locale: string;
  summary: string;
};

export default async function Form(props: FormProps) {
  const dictionary = await import(`lib/dictionaries/${props.locale}`).then((module) => module.default);

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-6 rounded-sm bg-gray-800 p-5 sm:p-6">
      <div className="col-span-4 flex items-center gap-5">
        <div className="inline-flex w-fit rounded-full bg-gray-500 p-3">
          <div className="relative h-8 w-8">
            <NextImage
              alt={props.name}
              className="object-contain"
              fill
              sizes="32px"
              src={getStaticImageData(props.icon)}
            />
          </div>
        </div>
        <h4 className="text-md sm:text-xl md:text-2xl md:font-light">{props.name}</h4>
      </div>
      <p className="md:text-md col-span-4 text-sm text-gray-50 md:font-semibold xl:col-span-3 xl:col-start-2 xl:text-right">
        {props.summary}
      </p>
      <div className="col-span-4">
        {/*<Grid className="gap-y-5">*/}
        {/*  {parameters.map((parameter) => {*/}
        {/*    if (parameter.__typename in FIELDS) {*/}
        {/*      const { id, __typename, ...props } = parameter;*/}
        {/*      const Field = FIELDS[__typename];*/}

        {/*      return <Field key={`${__typename}-${id}`} {...(props as any)} />;*/}
        {/*    }*/}

        {/*    throw new Error(`Invalid parameter type "${parameter.__typename}"`);*/}
        {/*  })}*/}
        {/*</Grid>*/}
      </div>
      <ButtonBlueFilled className="pointer-events-none col-span-4" component="p">
        {dictionary.Generate}
      </ButtonBlueFilled>
    </div>
  );
}
