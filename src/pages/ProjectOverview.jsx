import { HiDotsVertical } from "react-icons/hi";
import Task from "../UI/Task";
import Header from "../UI/Header";
import ProgressionBar from "../UI/ProgressionBar";
import { BsStopwatch } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useProject } from "../projects/ProjectContext";
import BackButton from "../UI/BackButton";
import TasksInput from "../projects/TasksInput";
import ProjectStatus from "../UI/ProjectStatus";
import Notes from "../UI/Notes";

function ProjectOverview() {
  const { projects, getProjectElapsed, formatTime } = useProject();
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));
  return (
    <>
      <div className="flex gap-10 ">
        <BackButton />
        <div className="flex flex-col items-start self-stretch w-full  gap-10">
          <div className="flex justify-between w-full items-stretch ">
            <div className="flex flex-col w-full gap-8">
              <Header>{project.name}</Header>
              <div className="flex justify-between items-center text-[18px] font-(family-name:--font-01) ">
                <ProjectStatus
                  projectId={project.id}
                  status={project.status}
                  progress={project.progress}
                />

                <div className="flex gap-2 items-center text-[#00A6FB]">
                  {Math.round(project.progress)}%
                  <span>
                    <ProgressionBar progress={project.progress} />
                  </span>
                </div>
                <div className="flex gap-2 items-center text-white">
                  <span>
                    <BsStopwatch />
                  </span>
                  {formatTime(getProjectElapsed(project))}
                </div>
              </div>
            </div>
            <HiDotsVertical className="text-white w-8 h-8" />
          </div>

          {/* DESCRIPTION */}
          <div className=" flex flex-col self-stretch  gap-2 p-3 border-t-2 border-[#474747] ">
            <div className=" text-white  text-[18px] font-(family-name:--font-01) ">
              Description :
            </div>
            <div className=" text-[#e6e6e6] text-[16px] font-(family-name:--font-02)">
              {project.description}
            </div>
          </div>

          {/* TASKS */}
          <div className="flex flex-col items-start self-stretch gap-2 p-3 border-t-2 border-[#474747]">
            <div className="font-(family-name:--font-01) text-white text-[18px]">
              Tasks :
            </div>
            <ul className="flex flex-col items-start self-stretch gap-4 ">
              {project.tasks
                .slice()
                .sort((a, b) => a.completed - b.completed)
                .map((task) => (
                  <Task key={task.id} projectId={project.id} task={task} />
                ))}

              <TasksInput projectId={project.id} />
            </ul>
          </div>

          <div className="flex flex-col items-start gap-2 self-stretch p-3 border-t-2 border-[#474747]">
            <div className="font-(--font-01) text-white text-[18px]">
              Notes :
            </div>

            {/* TEXT AREA */}
            <Notes project={project} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectOverview;
