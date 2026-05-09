import { HiDotsVertical, HiTrash } from "react-icons/hi";
import styled from "styled-components";
import ProjectStats from "../UI/ProjectStats";
import { useEffect, useRef, useState } from "react";
import StyledDotMenu, { MenuContent } from "../UI/dotMenu";
import { Link, useLocation } from "react-router-dom";
import { useProject } from "./ProjectContext";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Wrapper = styled.li`
  display: flex;
  padding: 16px 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border-top: 2px solid var(--color-highlight);
  background: var(--color-white00);
  box-shadow: ${({ $menuOpen }) =>
    $menuOpen ? "var(--shadow-gld)" : "var(--shadow-md)"};

  &:hover {
    box-shadow: var(--shadow-gld);
  }
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
  const location = useLocation();

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
    <OuterContainer>
      <Wrapper $menuOpen={menuOpen}>
        <InnerWrapper>
          <Link
            className="flex w-full justify-between"
            key={item.id}
            to={`/${linkUrl}/${item.id}`}
          >
            <ProjectInfo>
              <div className=" text-(--color-black00) text-[16px]  md:text-[18px] font-(family-name:--font-01)">
                <span>{item.name}</span>
              </div>
              <div className=" hidden md:block  text-(--color-black00) text-[12px] md:text-[16px]  font-(family-name:--font-02)">
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

          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMenu();
            }}
          >
            <HiDotsVertical />
          </button>
        </InnerWrapper>
      </Wrapper>

      <StyledDotMenu ref={menuRef} $open={menuOpen}>
        <MenuContent $open={menuOpen}>
          {location.pathname === "/home" && (
            <div
              className="cursor-pointer"
              onClick={() => updateStatus(item.id, "Archived")}
            >
              <HiArchiveBoxArrowDown size={16} />
            </div>
          )}

          {location.pathname === "/archive" && (
            <div
              className="cursor-pointer"
              onClick={() => updateStatus(item.id, "Active")}
            >
              Pull
            </div>
          )}

          <div
            className="cursor-pointer"
            onClick={() => deleteProject(item.id)}
          >
            <HiTrash />
          </div>
        </MenuContent>
      </StyledDotMenu>
    </OuterContainer>
  );
}

export default ProjectItem;
