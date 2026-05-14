import { BsStopwatch } from "react-icons/bs";
import ProgressionBar from "./ProgressionBar";
import ProjectStatus from "./ProjectStatus";
import styled from "styled-components";
import { useProject } from "../projects/ProjectContext";

const StyledProjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
      <div className="flex items-center gap-2 md:gap-8 ">
        <ProjectStatus status={item.status} />

        <div
          className={`flex gap-2 items-center ${
            item.status != "Archived"
              ? "text-(--color-pulled)"
              : "text-(--color-archived) opacity-80"
          }`}
        >
          <span className="hidden md:block">{Math.round(item.progress)}%</span>
          <span>
            <ProgressionBar progress={item.progress} status={item.status} />
          </span>
        </div>

        <div className="flex gap-2 items-center text-(--color-text-muted) text-[12px] md:text-[16px] whitespace-nowrap">
          <span>
            <BsStopwatch />
          </span>
          {formatTime(getProjectElapsed(item))}
        </div>
      </div>
    </StyledProjectStats>
  );
}

export default ProjectStats;
