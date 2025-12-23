import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import ProjectStats from "../UI/ProjectStats";
import { useEffect, useRef, useState } from "react";
import StyledDotMenu from "../UI/dotMenu";
import { Link } from "react-router-dom";
import { useProject } from "./ProjectContext";

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
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

function ProjectItem({ item, linkUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { deleteProject, updateStatus } = useProject();
  const menuRef = useRef();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Link
          className="flex w-full justify-between"
          key={item.id}
          to={`/${linkUrl}/${item.id}`}
        >
          <ProjectInfo>
            <div className=" text-[#1e1e1e] text-[16px]  md:text-[18px] font-(family-name:--font-01)">
              <span>{item.name}</span>
            </div>
            <div className=" hidden md:block  text-[#474747] text-[12px] md:text-[16px]  font-(family-name:--font-02)">
              {item.description}
            </div>
            <span className="block md:hidden">
              <ProjectStats item={item} />
            </span>
          </ProjectInfo>

          <span className="hidden md:block">
            <ProjectStats item={item} />
          </span>
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
            <StyledDotMenu ref={menuRef}>
              <div
                className="cursor-pointer"
                onClick={() => updateStatus(item.id, "Archived")}
              >
                Archive
              </div>
              <div
                className="cursor-pointer"
                onClick={() => deleteProject(item.id)}
              >
                Delete
              </div>
            </StyledDotMenu>
          )}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}

export default ProjectItem;
