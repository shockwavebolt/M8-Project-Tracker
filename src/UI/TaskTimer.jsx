import { useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { RxPause, RxPlay } from "react-icons/rx";

function TaskTimer(task) {
  const [runTime, setRunTime] = useState(false);

  function toggleRunTime() {
    setRunTime(!runTime);
  }

  return (
    <div className="flex gap-6 items-baseline">
      <div className="flex w-[175px] justify-center items-center gap-2">
        <div>
          {!task.completed ? (
            <button className="cursor-pointer" onClick={toggleRunTime}>
              {runTime ? <RxPlay /> : <RxPause />}
            </button>
          ) : (
            <div>
              {" "}
              <BsStopwatch />
            </div>
          )}

          {/* {" "}
                {time === "play" ? (
                  <RxPlay />
                ) : time === "pause" ? (
                  <RxPause />
                ) : (
                  <BsStopwatch />
                )} */}
        </div>
        <div>45m</div>
      </div>
    </div>
  );
}

export default TaskTimer;
