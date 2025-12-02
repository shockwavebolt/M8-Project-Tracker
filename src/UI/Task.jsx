import { BsStopwatch } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { RxBox, RxPause, RxPlay } from "react-icons/rx";
import { TfiCheckBox } from "react-icons/tfi";
import styled, { css } from "styled-components";
import { useProject } from "../projects/ProjectContext";
import { useEffect, useRef, useState } from "react";
import StyledDotMenu from "./dotMenu";

const variations = {
  incomplete: css`
    background: #fff;
  `,

  completed: css`
    color: white;
    background: #474747;
  `,
};

const TaskWrapper = styled.li`
  font-family: var(--font-font-02);
  display: flex;
  padding: 12px 12px;
  align-items: center;
  align-self: stretch;
  border-radius: 16px;
  ${(props) => variations[props.variation]}
`;

const EditInput = styled.input`
  all: unset; /* removes global inheritance */
  width: 100%;
  font-size: 16px;
  color: #1e1e1e;
  font-family: var(--font-font02);

  &:focus {
    outline: none;
  }
`;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function Task({ projectId, task }) {
  const {
    toggleTask,
    deleteTask,
    editTask,
    startTaskTimer,
    pauseTaskTimer,
    resetTaskTimer,
  } = useProject();

  const [menuOpen, setOpenMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title);
  const [runTime, setRunTime] = useState(false);
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
    if (runTime) {
      pauseTaskTimer(projectId, task.id);
    } else {
      startTaskTimer(projectId, task.id);
    }

    setRunTime(!runTime);
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
    <TaskWrapper variation={task.completed ? "completed" : "incomplete"}>
      <div
        className="flex w-full justify-between cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex gap-2 items-center">
          <div>{task.completed ? <TfiCheckBox /> : <RxBox />}</div>
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
              className={`text-[16px] ${task.completed ? "line-through" : ""}`}
            >
              {task.title}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-6 items-baseline">
        <div className="flex w-[175px] justify-center items-center gap-2">
          <div>
            {!task.completed ? (
              <button className="cursor-pointer" onClick={toggleRunTime}>
                {runTime ? <RxPause /> : <RxPlay />}
              </button>
            ) : (
              <div>
                {" "}
                <BsStopwatch />
              </div>
            )}
          </div>
          <div>{formatTime(displayTime)}</div>
        </div>
      </div>

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
              onClick={() => resetTaskTimer(projectId, task.id)}
            >
              Reset
            </div>
            <div className="cursor-pointer" onClick={handleEdit}>
              Edit
            </div>
            <div
              className="cursor-pointer"
              onClick={() => deleteTask(projectId, task.id)}
            >
              Delete
            </div>
          </StyledDotMenu>
        )}
      </div>
    </TaskWrapper>
  );
}

export default Task;
