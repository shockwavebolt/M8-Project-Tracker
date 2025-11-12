import { BsStopwatch } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { RxBox, RxPause, RxPlay } from "react-icons/rx";
import { TfiCheckBox } from "react-icons/tfi";
import styled, { css } from "styled-components";
import { useProject } from "../projects/ProjectContext";
import { useState } from "react";
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

function Task({ time, projectId, task }) {
  const { toggleTask, deleteTask, editTask } = useProject();

  const [menuOpen, setOpenMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title);

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
              onKeyDown={(e) => e.key === "Enter" && handleSave}
            ></EditInput>
          ) : (
            <div
              className={`text-[16px] ${task.completed ? "line-through" : ""}`}
            >
              {task.title}
            </div>
          )}
        </div>

        <div className="flex gap-6 items-baseline">
          <div className="flex w-[175px] justify-center items-center gap-2">
            <div>
              {" "}
              {time === "play" ? (
                <RxPlay />
              ) : time === "pause" ? (
                <RxPause />
              ) : (
                <BsStopwatch />
              )}
            </div>
            <div>45m</div>
          </div>
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
          <StyledDotMenu>
            <div>Reset</div>
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
