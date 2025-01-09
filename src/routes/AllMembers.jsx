import MemberCard from "../components/sidebar/sidebar-menu/sidebar-menu-item/member-items/MemberCard";
import CardView from "../components/ui-components/CardView";
import { useSelector } from "react-redux";

export default function AllMembers() {
  const membersData = useSelector((state) => state.members);
  const boardsData = useSelector((state) => state.boards);
  const getActiveBoardsForMember = (memberId) => {
    return boardsData.filter((board) =>
      board.members.some((member) => member.id === memberId),
    );
  };

  return (
    <CardView title={`All Members`}>
      {membersData.map((member) => {
        const activeBoards = getActiveBoardsForMember(member.id);
        return (
          <MemberCard
            key={member.id}
            img={member.img}
            name={member.name}
            role={member.role}
            activeBoardsCount={activeBoards.length}
          />
        );
      })}
    </CardView>
  );
}
