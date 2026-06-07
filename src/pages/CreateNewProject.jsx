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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

const FormInput = styled.input`
  width: 100%;
  height: 56px;
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
            <FieldLabel className=" text-[16px] md:text-[18px] font-(family-name:--font-01)">
              Project Name
            </FieldLabel>
            <InputWrapper>
              <FormInput
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </InputWrapper>
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel className=" text-[16px] md:text-[18px] font-(family-name:--font-01)">
              Description
            </FieldLabel>
            <InputWrapper>
              <FormInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputWrapper>
          </div>

          <div className="flex gap-4 md:gap-6">
            <Button variation="primary" onClick={handleCancel}>
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
