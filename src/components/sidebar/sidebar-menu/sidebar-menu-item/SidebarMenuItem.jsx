export default function SidebarMenuItem({ children }) {
  return (
    <div
      className="flex w-[180px] items-center justify-between rounded-lg border bg-white xl:w-[225px] 3xl:w-[275px] dark:border-drkbrd dark:bg-drkbg2 dark:text-drkcol cursor-pointer"
    >
      {children}
    </div>
  );
}