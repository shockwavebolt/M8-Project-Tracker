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
            className="grow"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button variation="tertiary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variation="primary" onClick={handleSubmit}>
            Add Task
          </Button>
        </div>
      )}
    </>
  );
}

export default TasksInput;
