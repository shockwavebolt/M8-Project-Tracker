import { BsStopwatch } from "react-icons/bs";
import ProgressionBar from "./ProgressionBar";
import ProjectStatus from "./ProjectStatus";
import styled from "styled-components";
import { useProject } from "../projects/ProjectContext";

const StyledProjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-grow: 1;

  [data-theme="midnight"] & {
    color: var(--color-white01);
  }
`;

function ProjectStats({ item }) {
  const { getProjectElapsed, formatTime } = useProject();
  return (
    <StyledProjectStats>
      <div className="flex flex-wrap items-center gap-2 md:gap-8">
        <ProjectStatus
          projectId={item.id}
          status={item.status}
          progress={item.progress}
        />

        <div
          className={`flex gap-2 items-center ${
            item.status != "Archived"
              ? "text-(--color-pulled)"
              : "text-(--color-archived) opacity-50"
          }`}
        >
          <span className="hidden md:block">{Math.round(item.progress)}%</span>
          <span>
            <ProgressionBar progress={item.progress} status={item.status} />
          </span>
        </div>

        <div className="flex gap-1 md:gap-2 items-center text-black00">
          <span>
            <BsStopwatch />
          </span>
          <span className="text-[12px] md:text-[16px] tabular-nums font-(family-name:--font-02) whitespace-nowrap">
            {formatTime(getProjectElapsed(item))}
          </span>
        </div>
      </div>
    </StyledProjectStats>
  );
}

export default ProjectStats;
