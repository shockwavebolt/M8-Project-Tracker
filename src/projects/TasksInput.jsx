import { useState } from "react";
import Button from "../UI/Button";
import { HiPlus } from "react-icons/hi";
import { useProject } from "./ProjectContext";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  border-radius: 32px;

  [data-theme="midnight"] & {
    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 32px;
      padding: 1px;
      background: linear-gradient(
        to bottom,
        var(--color-mauve00),
        var(--color-white01)
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 1;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    &::after {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 32px;
      border: 1px solid var(--color-white01);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  }

  [data-theme="midnight"] &:hover,
  [data-theme="midnight"] &:focus-within {
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
`;

const TaskInput = styled.input`
  width: 100%;
  height: 48px;
  font-size: 16px;
  background: none;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    height: 40px;
    font-size: 12px;
  }

  [data-theme="midnight"] & {
    color: var(--color-white01);
    border: none;
    outline: none;
  }
`;

function TasksInput({ projectId }) {
  const [task, setTask] = useState("");
  const [isAddingTask, setAddingTask] = useState(false);
  const { addTask } = useProject();

  function handleAddClick() {
    setAddingTask(true);
  }

  function handleCancelClick() {
    setAddingTask(false);
    setTask("");
  }

  function handleSubmit() {
    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
      isRunning: false,
      lastStart: null,
      elapsed: 0,
    };
    addTask(projectId, newTask);
    setTask(" ");
    setAddingTask(false);
  }

  return (
    <>
      {!isAddingTask ? (
        <Button variation="primary" onClick={handleAddClick}>
          <HiPlus />
          <span>New Task</span>
        </Button>
      ) : (
        <div className="flex items-center gap-2 w-full ">
          <InputWrapper>
            <TaskInput value={task} onChange={(e) => setTask(e.target.value)} />
          </InputWrapper>
          <span className=" hidden md:flex gap-2">
            <Button variation="primary" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button variation="primary" onClick={handleSubmit}>
              Add Task
            </Button>
          </span>

          {/* Mobile version */}
          <span className=" flex  md:hidden gap-1">
            <Button variation="primary_2" onClick={handleCancelClick}>
              &#x2715;
            </Button>
            <Button variation="primary_2" onClick={handleSubmit}>
              &#xFF0B;
            </Button>
          </span>
        </div>
      )}
    </>
  );
}

export default TasksInput;
