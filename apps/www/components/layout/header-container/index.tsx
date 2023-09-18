import LongText from "components/typography/logn-text";

type HeaderContainerProps = {
  title: string;
  subtitle?: string;
};

export default function HeaderContainer({ title, subtitle }: HeaderContainerProps) {
  return (
    <div className="container flex flex-col lg:items-center lg:text-center">
      <h2 className="w-full text-xl font-semibold sm:text-3xl md:text-5xl lg:w-10/12">{title}</h2>
      {subtitle && <LongText className="text-md mt-4 w-full sm:text-lg md:text-xl lg:w-9/12">{subtitle}</LongText>}
    </div>
  );
}
