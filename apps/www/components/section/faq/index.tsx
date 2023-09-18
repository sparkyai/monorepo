import Section from "components/layout/section";
import HeaderContainer from "components/layout/header-container";
import RichText from "components/common/rich-text";
import Question from "./question";

type FaqProps = {
  header: {
    title: string;
    subtitle: string;
  };
  questions: {
    id: number;
    answer: string;
    question: string;
  }[];
};

export default function Faq(props: FaqProps) {
  return (
    <Section>
      <HeaderContainer {...props.header} />
      {props.questions.length > 0 && (
        <div className="container flex flex-col gap-5 lg:mx-auto lg:w-8/12">
          {props.questions.map((item) => {
            return (
              <Question key={item.id} text={item.question}>
                <RichText className="sm:text-md mt-4 flex flex-col gap-4 text-sm text-gray-50 md:text-lg">
                  {JSON.parse(item.answer)}
                </RichText>
              </Question>
            );
          })}
        </div>
      )}
    </Section>
  );
}
