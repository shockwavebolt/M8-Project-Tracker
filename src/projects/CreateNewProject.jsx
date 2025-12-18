import { useState } from "react";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button";
import Header from "../UI/Header";
import { useProject } from "./ProjectContext";
import { useNavigate } from "react-router-dom";

function CreateNewProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const { addNewProject } = useProject();
  const navigate = useNavigate();

  function handleSubmit() {
    const newProject = {
      id: Date.now(),
      name: projectName,
      description: description,
      status: "Not Started",
      time: "0h0m",
      tasks: [],
      notes: "",
      progress: 0,
    };
    addNewProject(newProject);
    setProjectName("");
    setDescription("");
    // navigate(`/projects/:${newProject.id}`);
    navigate("/home");
  }

  function handleCancel() {
    setProjectName("");
    setDescription("");
    navigate(-1);
  }

  return (
    <div className="flex px-2 md:gap-10">
      <span className="hidden md:block">
        <BackButton />
      </span>
      <div className="flex flex-col gap-8 md:gap-12 self-stretch w-[600px]">
        <Header>Create New Project</Header>
        <div className="flex flex-col gap-6 p-3 border-t-2 border-[#474747] ">
          <div className="flex flex-col gap-2">
            <div className=" text-white text-[16px] md:text-[18px] font-(family-name:--font-01) ">
              Project Name
            </div>
            <input
              className="w-full h-10 text-[12px] md:text-[16px]"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <div className=" text-white text-[16px]  md:text-[18px] font-(family-name:--font-01) ">
              Description
            </div>
            <input
              className="w-full h-10 text-[12px] md:text-[16px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>

          <div className="flex gap-2 md:gap-6">
            <Button variation="tertiary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variation="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewProject;
