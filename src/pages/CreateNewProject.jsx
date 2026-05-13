import { useState } from "react";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button";
import Header from "../UI/Header";
import { useProject } from "../projects/ProjectContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FieldLabel = styled.div`
  color: var(--color-black00);

  [data-theme="midnight"] & {
    color: var(--color-white01);
  }
`;

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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <FieldLabel className="text-[16px] md:text-[18px] font-(family-name:--font-01)">
              Project Name
            </FieldLabel>
            <input
              className="w-full h-14 text-[12px] md:text-[16px]"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel className="text-[16px] md:text-[18px] font-(family-name:--font-01)">
              Description
            </FieldLabel>
            <input
              className="w-full h-14 text-[12px] md:text-[16px]"
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
