import {PiCircleFill} from "react-icons/pi";

export default function ListTitle({ title, numCards, listColor }) {
  return (
    <>
      <div className="flex w-[250px] items-center justify-between md:w-[300px] dark:border-drkbrd dark:bg-drkbg2 dark:text-drkcol">
        <div className="flex w-fit items-center gap-1">
          <PiCircleFill className="text-xs" style={{ color: listColor }} />
          <p className="text-sm font-medium md:text-base">{title}</p>
          <div className="mx-1.5 flex w-fit items-center justify-center rounded-xl bg-white px-4 py-1 text-sm font-semibold dark:border-drkbrd dark:bg-drkbg dark:text-drkcol">
            <p className="font-medium">{numCards}</p>
          </div>
        </div>
      </div>
    </>
  );
}