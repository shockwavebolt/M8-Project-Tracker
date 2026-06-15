import { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import styled from "styled-components";
import { useProject } from "../projects/ProjectContext";

const StatusBtnPaused = styled.div`
  display: flex;
  align-items: center;
  border-radius: 9999px;
`;

const StatusBtnActive = styled.div`
  display: flex;
  align-items: center;
  padding: 1px;
  justify-content: center;
  border-radius: 9999px;
  border-top: 1px solid #fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;

  [data-theme="midnight"] & {
    position: relative;
    border: 1px solid var(--color-white01);
    padding: 1px;
    background: none;
    box-shadow: none;
    transition: box-shadow 0.25s ease;
  }

  [data-theme="midnight"] &:hover {
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
`;

function ProjectStatus({ projectId, status, progress }) {
  const [curStatus, setCurStatus] = useState(status);
  const { updateStatus, pauseProject } = useProject();

  useEffect(() => {
    if (status === "Archived") return;

    if (progress === 100 && status !== "Completed") {
      updateStatus(projectId, "Completed");
    } else if (progress === 0 && status === "Completed") {
      updateStatus(projectId, "Not Started");
    } else if (status === "Completed" && progress < 100) {
      updateStatus(projectId, "Paused");
    }
  }, [progress, projectId, status, updateStatus]);

  useEffect(() => setCurStatus(status), [status]);

  function handlePause(e) {
    e.preventDefault();
    e.stopPropagation();
    pauseProject(projectId);
  }

  return (
    <div
      className={`relative flex md:p-3 gap-2 justify-center items-center  whitespace-nowrap   ${
        curStatus === "Active"
          ? "text-(--color-status-active)"
          : curStatus === "Paused"
            ? "text-(--color-status-paused)"
            : curStatus === "Completed"
              ? "text-(--color-status-completed)"
              : curStatus === "Archived"
                ? "text-(--color-archived)"
                : ""
      }`}
    >
      {curStatus === "Not Started" ? (
        <FaRegCircle className="w-3 h-3 md:w-4 md:h-4 translate-y-[0.05em]" />
      ) : curStatus === "Paused" ? (
        <StatusBtnPaused>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-(--color-status-paused) " />
        </StatusBtnPaused>
      ) : curStatus === "Active" ? (
        <StatusBtnActive onClick={handlePause}>
          <div className="w-3  h-3 md:w-4 md:h-4 rounded-full bg-(--color-status-active)" />
        </StatusBtnActive>
      ) : curStatus === "Completed" ? (
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-(--color-status-completed)" />
      ) : curStatus === "Archived" ? (
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-(--color-archived)" />
      ) : null}

      <div
        className={`text-[12px] md:text-[16px] ${
          curStatus === "Completed" || curStatus === "Not Started"
            ? "pointer-events-none"
            : ""
        }`}
      >
        {curStatus}
      </div>
    </div>
  );
}

export default ProjectStatus;
