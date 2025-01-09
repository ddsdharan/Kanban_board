
import { PiChartLineUpBold } from "react-icons/pi"

export default function TimeItem({title}) {
  return (
    <div>
      <p className="mb-2 pl-1 font-medium xl:text-lg dark:text-drkcol">{title}</p>
      <div className="3xl:w-[275px] flex w-[180px] flex-col gap-3 rounded-lg border bg-white p-4 xl:w-[225px] dark:border-drkbrd dark:bg-drkbg2 dark:text-drkcol">
        <p className="text-xs text-[#8f959f] dark:text-drkcol">TOTAL HOURS</p>
        <p className="text-xl font-medium">23.7 hours</p>
        <div className="flex items-center">
          <PiChartLineUpBold className="text-green-500" />
          &nbsp;
          <p className="text-xs">
            <span className="text-green-500">2.5%</span> from last week
          </p>
        </div>
      </div>
    </div>
  );
}