
export default function MemberCard({ img, name, role, activeBoardsCount }) {
  return (
    <div className="flex w-auto flex-col justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 shadow-lg sm:h-auto dark:border-drkbrd dark:bg-drkbg2 dark:text-drkcol">
      <div className="flex basis-1/3 cursor-pointer flex-col items-center justify-center gap-2">
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full border-[1px] bg-white">
          <img src={img} alt="memberImages" className="h-full w-full rounded-full object-cover" />
        </div>
      </div>
      <p className="text-center font-medium">{name}</p>
      <span className="text-center font-normal text-xs">{role}</span>
      <p className="text-center text-sm">Active boards: {activeBoardsCount}</p>
    </div>
  );
}