import { useEffect, useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProject } from "../projects/ProjectContext";

const StatusMenu = styled.div`
  position: absolute;
  z-index: 50;
  left: 100%;
  display: flex;
  padding: 16px 16px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid #474747;
  background: #1e1e1e;
  box-shadow: 0 5px 7px 4px rgba(0, 0, 0, 0.25);
`;

function ProjectStatus({ projectId, status, progress }) {
  const [curStatus, setCurStatus] = useState(status);
  const { updateStatus } = useProject();
  const { id } = useParams();
  const [menuOpen, setOpenMenu] = useState(false);

  useEffect(() => {
    if (status === "Paused") return;

    if (progress === 100 && status !== "Completed") {
      setCurStatus("Completed");
      updateStatus(projectId, "Completed");
    } else if (progress === 0 && status !== "Not Started") {
      setCurStatus("Not Started");
      updateStatus(projectId, "Not Started");
    } else if (progress > 0 && progress < 100 && status !== "Active") {
      updateStatus(projectId, "Active");
    }
  }, [progress, projectId, status, updateStatus]);

  useEffect(() => setCurStatus(status), [status]);

  function toggleMenu() {
    if (id && curStatus !== "Completed" && curStatus !== "Not Started")
      setOpenMenu(!menuOpen);
  }

  function handleSelection(newStatus) {
    setCurStatus(newStatus);
    updateStatus(projectId, newStatus);
    setOpenMenu(!menuOpen);
  }

  return (
    <div
      className={`relative flex p-3 gap-2 justify-center items-center  whitespace-nowrap   ${
        curStatus === "Active"
          ? "text-[#B3E493]"
          : curStatus === "Paused"
          ? "text-[#ECA72C]"
          : curStatus === "Completed"
          ? "text-[#769fb6]"
          : "text-[#adadad]"
      }`}
    >
      {curStatus === "Not Started" ? (
        <FaRegCircle className="w-4 h-4  translate-y-[0.05em]" />
      ) : (
        <FaCircle className="w-4 h-4  translate-y-[0.05em]" />
      )}

      <div
        onClick={toggleMenu}
        className={`cursor-pointer ${
          curStatus === "Completed" || curStatus === "Not Started"
            ? "pointer-events-none"
            : ""
        }`}
      >
        {curStatus}
      </div>
      {menuOpen && (
        <StatusMenu>
          <FaCircle
            className="w-4 h-4 text-[#B3E493] cursor-pointer"
            onClick={() => handleSelection("Active")}
          ></FaCircle>
          <FaCircle
            className="w-4 h-4 text-[#ECA72C] cursor-pointer"
            onClick={() => handleSelection("Paused")}
          ></FaCircle>
        </StatusMenu>
      )}
    </div>
  );
}

export default ProjectStatus;
