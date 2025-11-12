import { useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

function ProjectStatus({ status }) {
  const { id } = useParams();
  const [menuOpen, setOpenMenu] = useState(false);

  function toggleMenu() {
    if (id) setOpenMenu(!menuOpen);
  }

  return (
    <div
      className={`relative flex p-3 gap-2 justify-center items-center  whitespace-nowrap   ${
        status === "Active"
          ? "text-[#B3E493]"
          : status === "Paused"
          ? "text-[#ECA72C]"
          : "text-[#adadad]"
      }`}
    >
      {status === "Not Started" ? (
        <FaRegCircle className="w-4 h-4  translate-y-[0.05em]" />
      ) : (
        <FaCircle className="w-4 h-4  translate-y-[0.05em]" />
      )}

      <div onClick={toggleMenu} className="cursor-pointer">
        {status}
      </div>
      {menuOpen && (
        <StatusMenu>
          <FaCircle className="w-4 h-4 text-[#B3E493]"></FaCircle>
          <FaCircle className="w-4 h-4 text-[#ECA72C]"></FaCircle>
        </StatusMenu>
      )}
    </div>
  );
}

export default ProjectStatus;
