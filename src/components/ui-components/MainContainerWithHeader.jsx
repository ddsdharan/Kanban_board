export default function MainViewContainerWithHeader({children}) {
  return (
    <div className="#181a1f fixed right-0 top-[230px] z-[-1] h-[calc(100%_-_230px)] w-full overflow-x-auto overflow-y-auto border-l bg-[#f7f7f7] p-5 lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol">
      {children}
    </div>
  );
}