import MainContainer from "../../components/ui-components/MainContainer";
import faqs from "../../data/faqs";
import FaqItem from "./FaqItem";

export default function Faq() {
  return (
    <MainContainer
      title={`Frequently asked questions`}
      subtitle={`Need some help? Here are some questions and answers all in one place `}
    >
      <div className="flex w-full flex-col gap-4 md:p-2 xl:grid xl:grid-cols-2 xl:gap-x-5 xl:gap-y-10">
        {faqs.map((f) => (
          <FaqItem
            key={f.id}
            question={f.question}
            answer={f.answer}
            icons={f.icons}
          />
        ))}
      </div>
    </MainContainer>
  );
}
