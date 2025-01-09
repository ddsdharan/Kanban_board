import { Link } from "react-router-dom";

import { RiMedal2Fill } from "react-icons/ri";

export default function ProjectCard({
  projectName,
  projectImageUrl,
  projectCompletion,
  boardId,
  members,
}) {
  return (
    <div className="relative flex w-auto flex-col items-center justify-center gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-lg sm:h-auto dark:border-drkbrd dark:bg-drkbg2 dark:text-drkcol">
      <div className="flex basis-1/3 cursor-pointer flex-col items-center justify-center gap-2">
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full border-[1px]">
          <img
            src={projectImageUrl}
            alt="projectimage"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      {members.length !== 0 ? (
        <div className="relative flex -space-x-2">
          {members.map((member) => (
            <div key={member.id}>
              <img
                src={member.img}
                alt={member.name}
                width={25}
                height={25}
                className="rounded-full border"
              />
            </div>
          ))}
        </div>
      ) : null}
      <p className="text-center text-lg font-medium">{projectName}</p>
      <div className="flex items-center gap-2">
        {projectCompletion === 100 ? (
          <RiMedal2Fill className="text-2xl text-[#ffbf00]" />
        ) : null}
        <p
          className={`text-center text-sm ${projectCompletion === 100 ? `font-semibold` : null}`}
        >
          {projectCompletion ? projectCompletion : `0`}% complete
        </p>
      </div>
      <Link
        to={`/project/${boardId}/tasks`}
        className="w-[80%] rounded-md bg-[#365dff] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#1c49ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        View Project
      </Link>
    </div>
  );
}