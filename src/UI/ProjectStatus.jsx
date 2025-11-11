import { FaCircle, FaRegCircle } from "react-icons/fa";

function ProjectStatus({ status }) {
  return (
    <div
      className={`flex p-3 gap-2 justify-center items-center  whitespace-nowrap  ${
        status === "Active"
          ? "text-[#B3E493]"
          : status === "Paused"
          ? "text-[#ECA72C]"
          : status === "Completed"
          ? "text-[#769FB6]"
          : "text-[#adadad]"
      }`}
    >
      {status === "Not Started" ? (
        <FaRegCircle className="w-4 h-4  translate-y-[0.05em]" />
      ) : (
        <FaCircle className="w-4 h-4  translate-y-[0.05em]" />
      )}

      <div>{status}</div>
    </div>
  );
}

export default ProjectStatus;
