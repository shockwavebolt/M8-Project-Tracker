import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import ProgressionBar from "../UI/ProgressionBar";
import { BsStopwatch } from "react-icons/bs";
import ProjectStatus from "../UI/ProjectStatus";
import { useState } from "react";
import StyledDotMenu from "../UI/dotMenu";
import { Link } from "react-router-dom";

const Wrapper = styled.li`
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const ProjectStats = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 450px;
  align-items: baseline;
  flex-grow: 1;
`;

function ProjectItem({ item }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <Link
          className="flex w-full justify-between"
          key={item.id}
          to={`/projects/${item.id}`}
        >
          <ProjectInfo>
            <div className=" text-[#1e1e1e]  text-[18px] font-(family-name:--font-01)">
              {item.name}
            </div>
            <div className="text-[#474747] text-[16px] font-(family-name:--font-02)">
              {item.description}
            </div>
          </ProjectInfo>

          <ProjectStats>
            <div className="flex items-center gap-8 ">
              <ProjectStatus status={item.status} />

              {/* <div className="flex p-3 gap-2 justify-center items-center text-[#B3E493]">
              <FaCircle className="w-4 h-4  translate-y-[0.05em]" />
              <div>{item.status}</div>
            </div> */}

              <div className="flex gap-2 items-center text-[#769FB6]">
                {Math.round(item.progress)}%
                <span>
                  <ProgressionBar progress={item.progress} />
                </span>
              </div>

              <div className="flex gap-2 items-center text-[#474747]">
                <span>
                  <BsStopwatch />
                </span>
                12h 45m
              </div>
            </div>
          </ProjectStats>
        </Link>

        <div className="relative">
          <button
            className="cursor-pointer z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMenu();
            }}
          >
            <HiDotsVertical />
          </button>

          {menuOpen && (
            <StyledDotMenu>
              <div>Archive</div>
              <div>Delete</div>
            </StyledDotMenu>
          )}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}

export default ProjectItem;
