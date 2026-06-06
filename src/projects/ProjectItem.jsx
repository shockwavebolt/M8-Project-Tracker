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
  min-width: 0;
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

  [data-theme="midnight"] & {
    background: var(--color-black03);
    border: 1px solid var(--color-black03);
    box-shadow: none;
    border: ${({ $menuOpen }) =>
      $menuOpen
        ? "1px solid var(--color-white01)"
        : "1px solid var(--color-black03)"};
  }

  [data-theme="midnight"] &:hover {
    box-shadow: none;
    border: 1px solid var(--color-white00);
  }
`;

const DotsButton = styled.button`
  cursor: pointer;
  margin-left: 24px;
  color: var(--color-black00);

  [data-theme="midnight"] & {
    color: var(--color-white01);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    margin-left: 8px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    justify-content: ${({ $menuOpen }) => ($menuOpen ? "flex-start" : "space-between")};
    gap: ${({ $menuOpen }) => ($menuOpen ? "8px" : "0")};
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const ProjectName = styled.div`
  color: var(--color-black00);
  font-family: var(--font-01);

  [data-theme="midnight"] & {
    color: var(--color-white01);
  }
`;

const ProjectDescription = styled.div`
  color: var(--color-black00);
  font-family: var(--font-02);

  [data-theme="midnight"] & {
    color: var(--color-white01);
  }
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
    <OuterContainer ref={menuRef}>
      <Wrapper $menuOpen={menuOpen}>
        <InnerWrapper $menuOpen={menuOpen}>
          <Link
            className="flex w-full justify-between"
            key={item.id}
            to={`/${linkUrl}/${item.id}`}
          >
            <ProjectInfo>
              <ProjectName className="text-[16px] md:text-[18px]">
                <span>{item.name}</span>
              </ProjectName>
              <ProjectDescription className="hidden md:block text-[12px] md:text-[16px]">
                {item.description}
              </ProjectDescription>
              <span className="block md:hidden">
                <ProjectStats item={item} />
              </span>
            </ProjectInfo>

            <span className="hidden md:block">
              <ProjectStats item={item} />
            </span>
          </Link>

          <DotsButton
            $menuOpen={menuOpen}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMenu();
            }}
          >
            <HiDotsVertical />
          </DotsButton>
        </InnerWrapper>
      </Wrapper>

      <StyledDotMenu $open={menuOpen}>
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
            className="cursor-pointer text-(--color-red00)"
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
