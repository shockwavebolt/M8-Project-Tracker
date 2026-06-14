import { BsPencilSquare, BsStopwatch } from "react-icons/bs";
import { HiDotsVertical, HiTrash } from "react-icons/hi";
import { RxBox, RxPause, RxPlay } from "react-icons/rx";
import { TfiCheckBox } from "react-icons/tfi";
import styled, { css } from "styled-components";
import { useProject } from "../projects/ProjectContext";
import { useEffect, useRef, useState } from "react";
import StyledDotMenu, { MenuContent } from "./dotMenu";
import { FaEdit } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

const variations = {
  incomplete: css`
    background: var(--color-white00);
    border-top: 2px solid var(--color-highlight);
    box-shadow: var(--shadow-md);

    &:hover {
      box-shadow: var(--shadow-gld);
    }

    [data-theme="midnight"] & {
      background: var(--color-black03);
      border: 1px solid var(--color-black03);
      color: var(--color-white01);
    }

    [data-theme="midnight"] &:hover {
      box-shadow: none;
      border: 1px solid var(--color-white01);
    }
  `,

  completed: css`
    color: var(--color-white00);
    background: var(--color-black00);

    [data-theme="midnight"] & {
      background: var(--color-teal);
      color: var(--color-white01);
    }
  `,
};

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 100%;
  width: 100%;
`;

const TaskWrapper = styled.li`
  min-width: 0;
  font-family: var(--font-font-02);
  display: flex;
  flex: 1;
  padding: 12px 12px;
  align-items: center;
  align-self: stretch;
  border-radius: 16px;
  ${(props) => variations[props.variation]}
  ${({ $menuOpen }) => $menuOpen && "box-shadow: var(--shadow-gld);"}

  [data-theme="midnight"] & {
    box-shadow: none;
    border: ${({ $menuOpen }) =>
      $menuOpen
        ? "1px solid var(--color-white01)"
        : "1px solid var(--color-black03)"};
  }
`;

const EditInput = styled.input`
  all: unset; /* removes global inheritance */
  width: 100%;
  font-size: 16px;
  color: var(--color-text-dark);
  font-family: var(--font-font02);

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

function Task({ projectId, task, projectStatus }) {
  const {
    toggleTask,
    deleteTask,
    editTask,
    startTaskTimer,
    pauseTaskTimer,
    resetTaskTimer,
    formatTime,
  } = useProject();

  const [menuOpen, setOpenMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title);
  const [displayTime, setDisplayTime] = useState(task.elapsed);
  const menuRef = useRef(null);

  function handleClick() {
    toggleTask(projectId, task.id);
    console.log(task.completed);
  }

  function handleEdit() {
    setIsEditing(true);
    setOpenMenu(false);
  }

  function handleSave() {
    if (editedText.trim() !== task.title) {
      editTask(projectId, task.id, editedText.trim());
    }
    setIsEditing(false);
  }

  function toggleMenu() {
    setOpenMenu(!menuOpen);
  }

  function toggleRunTime() {
    if (task.isRunning) {
      pauseTaskTimer(projectId, task.id);
    } else {
      startTaskTimer(projectId, task.id);
    }
  }

  useEffect(() => {
    setDisplayTime(task.elapsed);
  }, [task.elapsed]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <OuterContainer ref={menuRef}>
      <TaskWrapper
        variation={task.completed ? "completed" : "incomplete"}
        $menuOpen={menuOpen}
      >
        <div
          className={`flex w-full justify-between cursor-pointer ${menuOpen ? "min-w-0 overflow-hidden" : ""}`}
          onClick={handleClick}
        >
          <div
            className={`flex gap-2 items-center ${menuOpen ? "min-w-0" : ""}`}
          >
            <div className="shrink-0">
              {task.completed ? <TfiCheckBox /> : <RxBox />}
            </div>
            {isEditing ? (
              <EditInput
                autoFocus
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              ></EditInput>
            ) : (
              <div
                className={`text-[12px] md:text-[16px] ${
                  task.completed ? "line-through" : ""
                } ${menuOpen ? "truncate" : ""}`}
              >
                {task.title}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-6 items-baseline">
          <div className="flex  justify-center items-center gap-2">
            <div>
              {!task.completed && projectStatus !== "Archived" ? (
                <button className="cursor-pointer" onClick={toggleRunTime}>
                  {task.isRunning ? <RxPause /> : <RxPlay />}
                </button>
              ) : (
                <div>
                  <BsStopwatch />
                </div>
              )}
            </div>
            <div className="text-[12px] md:text-[16px] whitespace-nowrap mr-2 md:mr-4 tabular-nums">
              {formatTime(displayTime)}
            </div>
          </div>
        </div>

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
      </TaskWrapper>

      <StyledDotMenu $open={menuOpen} $row>
        <MenuContent $open={menuOpen} $row>
          <div
            className="cursor-pointer"
            onClick={() => resetTaskTimer(projectId, task.id)}
          >
            <RiResetLeftLine />
          </div>
          <div className="cursor-pointer" onClick={handleEdit}>
            <FaEdit />
          </div>
          <div
            className="cursor-pointer text-(--color-red00)"
            onClick={() => deleteTask(projectId, task.id)}
          >
            <HiTrash />
          </div>
        </MenuContent>
      </StyledDotMenu>
    </OuterContainer>
  );
}

export default Task;
