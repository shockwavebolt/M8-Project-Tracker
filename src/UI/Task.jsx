import { BsStopwatch } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { RxBox, RxPause, RxPlay } from "react-icons/rx";
import { TfiCheckBox } from "react-icons/tfi";
import styled, { css } from "styled-components";
import { useProject } from "../projects/ProjectContext";

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
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 16px;
  cursor: pointer;
  ${(props) => variations[props.variation]}
`;

function Task({ children, time, projectId, task }) {
  const { toggleTask } = useProject();

  function handleClick() {
    toggleTask(projectId, task.id);
    console.log(task.completed);
  }

  return (
    <TaskWrapper
      onClick={handleClick}
      variation={task.completed ? "completed" : "incomplete"}
    >
      <div className="flex gap-2 items-center">
        <div>{task.completed ? <TfiCheckBox /> : <RxBox />}</div>
        <div className={`text-[16px] ${task.completed ? "line-through" : ""}`}>
          {children}
        </div>
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
        <HiDotsVertical />
      </div>
    </TaskWrapper>
  );
}

export default Task;
