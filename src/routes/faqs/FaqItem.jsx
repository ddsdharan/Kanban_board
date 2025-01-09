import { PiQuestionBold } from "react-icons/pi";

export default function FaqItem({question, answer, icons}) {
  return (
    <div className="flex gap-3">
      <div className="mt-[3px] flex h-[30px] w-[30px] flex-shrink-0 basis-[25px] items-center justify-center rounded-md bg-blue-200 p-1.5 dark:bg-[#365dff]">
        <PiQuestionBold className="text-[30px] text-[#365dff] dark:text-white" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">{question}</p>
        <p className="dark:text-drkol text-sm leading-6 text-[#878590]">
          {answer}
        </p>
        {icons && (
          <div className="flex items-center justify-between rounded-md p-2 dark:border-drkbrd">
            {icons.map((icon) => (
              <div key={icon.id} className="dark:bg-[#ffffff] rounded-xs p-0.5">
                <img
                  width={30}
                  height={30}
                  src={icon.src}
                  alt={icon.title}
                  title={icon.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}