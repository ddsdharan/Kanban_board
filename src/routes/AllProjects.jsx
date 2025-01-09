import { useSelector } from "react-redux";

import CardView from "../components/ui-components/CardView";
import ProjectCard from "../components/sidebar/sidebar-menu/sidebar-menu-item/project-items/ProjectCard";
import AddProject from "../components/sidebar/sidebar-menu/sidebar-menu-item/AddProject";

export default function AllProjects() {
  const projects = useSelector((state) => state.boards);

  const calculateCompletionPercentage = (board) => {
    const totalCards = board.lists.reduce(
      (total, list) => total + list.cards.length,
      0,
    );
    const completedCards =
      board.lists.find((list) => list.name === "Done")?.cards.length || 0;
    const percentageComplete =
      totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;

    return percentageComplete;
  };

  return (
    <>
      <CardView title={`All Projects`}>
        {projects.length === 0 && (
          <div className="flex flex-col gap-3">
            <p>There are currently no projects!</p>
            <span className="flex items-center gap-3">Click here to add one: <AddProject /> </span>
          </div>
        )}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            projectName={project.name}
            projectImageUrl={project.img}
            projectCompletion={calculateCompletionPercentage(project)}
            boardId={project.id}
            members={project.members}
          />
        ))}
      </CardView>
    </>
  );
}
