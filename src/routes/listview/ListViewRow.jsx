import { deleteCard } from "../../features/cards/cardsSlice";
import { deleteBoardCard } from "../../features/boards/boardsSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function ListViewRow({ id, status, title, category, tasks, members }) {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  function handleDeleteCard(id) {
    dispatch(deleteCard(id));
    dispatch(deleteBoardCard({ boardId: parseInt(boardId), cardId: id }));
  }

    const completedCount = tasks
      ? tasks.filter((item) => item.checked).length
      : "";
    const totalCount = tasks ? tasks.length : "";
    const allCompleted = tasks && completedCount === totalCount;

  return (
    <>
      <tr className="cursor-pointer border-b border-t bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-drkbrd dark:bg-drkbg dark:even:bg-[#1e2229] dark:hover:bg-[#191d22]">
        <td className="">
        </td>
        <td
          // scope="row"
          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        >
          {status}
        </td>
        <td className="px-6 py-4">{title}</td>
        <td className="px-6 py-4 text-[12px] font-medium">
          <span
            className="rounded-full px-3 py-1.5 dark:hidden"
            style={{
              backgroundColor: category.bgColor,
              color: category.textColor,
            }}
          >
            {category.name}
          </span>
          <span
            className="hidden rounded-full px-3 py-1.5 dark:inline"
            style={{
              backgroundColor: category.drkBgcolor,
              color: category.drkColor,
            }}
          >
            {category.name}
          </span>
        </td>
        <td
          className={`px-6 py-4 ${allCompleted && totalCount !== 0 && `font-semibold text-green-600 dark:text-emerald-400`} text-sm text-[#a4a6a8] dark:text-drkcol`}
        >{`${completedCount}/${totalCount}`}</td>
        <td className="px-6 py-4">
          <div className="relative flex -space-x-2">
            {members.map((member) => (
              <img
                key={member.id}
                src={member.img}
                alt={member.name}
                className="h-[30px] w-[30px] rounded-full border object-cover"
              />
            ))}
          </div>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => handleDeleteCard(id)}
            className="ms-3 text-red-600 hover:underline dark:text-red-500"
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
}
