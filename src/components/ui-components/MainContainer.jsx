import { useNavigate } from "react-router-dom";
import { PiArrowCircleLeftBold } from "react-icons/pi";

export default function MainContainer({ children, title, subtitle }) {
  const navigate = useNavigate();

  return (
    <div className="no-scrollbar fixed right-0 top-[80px] z-[-1] h-[calc(100%_-_80px)] w-full overflow-y-scroll border-x bg-white px-4 pb-4 pt-4 sm:px-5 sm:pt-5 lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol">
      <div className="mb-5 flex items-start gap-3">
        <PiArrowCircleLeftBold
          className="mt-[2.5px] cursor-pointer text-2xl flex-shrink-0"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium dar:text-white">{title}</h1>
          <p className="text-sm text-[#878590] dark:text-drkcol">{subtitle}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4 dark:border-drkbrd">{children}</div>
    </div>
  );
}
