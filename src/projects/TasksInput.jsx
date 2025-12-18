import { useState } from "react";
import Button from "../UI/Button";
import { HiPlus } from "react-icons/hi";
import { useProject } from "./ProjectContext";

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
        <div className="flex gap-2 w-full ">
          <input
            className="grow h-10 text-[12px] md:text-[16px]"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <span className=" hidden md:flex gap-2">
            <Button variation="tertiary" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button variation="primary" onClick={handleSubmit}>
              Add Task
            </Button>
          </span>

          {/* Mobile version */}
          <span className=" flex  md:hidden gap-1">
            <Button variation="tertiary_2" onClick={handleCancelClick}>
              &#x2715;
            </Button>
            <Button variation="primary_2" onClick={handleSubmit}>
              <HiPlus />
            </Button>
          </span>
        </div>
      )}
    </>
  );
}

export default TasksInput;
