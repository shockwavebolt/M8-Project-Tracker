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
import styled from "styled-components";

const TextSection = styled.div`
  [data-theme="midnight"] & {
    color: var(--color-white01);
    border-color: var(--color-black03);
  }
`;

function ProjectOverview() {
  const { projects, getProjectElapsed, formatTime } = useProject();
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));
  if (!project) return null;
  return (
    <>
      <div className="flex md:gap-10 ">
        <span className="hidden md:block">
          <BackButton />
        </span>

        <div className="flex flex-col px-2 sm:px-0 items-start self-stretch w-full  gap-10">
          <div className="flex justify-between w-full items-stretch ">
            <div className="flex flex-col w-full gap-8">
              <Header>{project.name}</Header>

              <TextSection className="flex justify-between items-center text-[18px] font-(family-name:--font-01) ">
                <ProjectStatus
                  projectId={project.id}
                  status={project.status}
                  progress={project.progress}
                />

                <div
                  className={`flex gap-1 md:gap-2 items-center ${
                    project.status != "Archived"
                      ? "text-(--color-pulled)"
                      : "text-(--color-archived)"
                  }`}
                >
                  <span className="text-[12px] md:text-[16px]">
                    {Math.round(project.progress)}%
                  </span>
                  <span>
                    <ProgressionBar
                      progress={project.progress}
                      status={project.status}
                    />
                  </span>
                </div>
                <div className="flex gap-1 md:gap-2 items-center text-black00">
                  <span>
                    <BsStopwatch />
                  </span>
                  <span className="text-[12px] md:text-[16px] tabular-nums font-(family-name:--font-02)">
                    {formatTime(getProjectElapsed(project))}
                  </span>
                </div>
              </TextSection>
            </div>
          </div>

          {/* DESCRIPTION */}
          <TextSection className=" flex flex-col self-stretch  gap-2 mt-3 pt-3 border-t border-(--color-elevated) ">
            <div className=" text-black00  text-[16px] md:text-[18px] font-(family-name:--font-01) ">
              Description :
            </div>
            <div className=" text-(--color-text-black00) text-[12px] md:text-[16px] font-(family-name:--font-02)">
              {project.description}
            </div>
          </TextSection>

          {/* TASKS */}
          <TextSection className="flex flex-col items-start self-stretch gap-2 mt-3 pt-3 border-t border-(--color-elevated)">
            <div className="font-(family-name:--font-01) text-black00 text-[16px] md:text-[18px]">
              Tasks :
            </div>
            <ul className="flex flex-col items-start self-stretch gap-4 ">
              {project.tasks
                .slice()
                .sort((a, b) => a.completed - b.completed)
                .map((task) => (
                  <Task
                    key={task.id}
                    projectId={project.id}
                    task={task}
                    projectStatus={project.status}
                  />
                ))}

              <TasksInput projectId={project.id} />
            </ul>
          </TextSection>

          <TextSection className="flex flex-col items-start gap-2 self-stretch mt-3 pt-3 border-t border-(--color-black00)">
            <div className="font-(--font-01) text-black00 text-[16px] md:text-[18px]">
              Notes :
            </div>

            {/* TEXT AREA */}
            <Notes project={project} />
          </TextSection>
        </div>
      </div>
    </>
  );
}

export default ProjectOverview;
