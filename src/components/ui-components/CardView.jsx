import { useNavigate } from "react-router-dom";
import { PiArrowCircleLeftBold } from "react-icons/pi";

export default function CardView({children, title}) {

  const navigate = useNavigate();

  return (
    <div className="fixed right-0 top-[80px] z-[-1] h-[calc(100%_-_80px)] w-full overflow-y-scroll border-x bg-white px-4 pt-4 pb-4 sm:px-5 sm:pt-5 lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol no-scrollbar">
      <div className="mb-5 flex items-center gap-3">
        <PiArrowCircleLeftBold
          className="cursor-pointer text-2xl"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">{children}</div>
    </div>
  );
}