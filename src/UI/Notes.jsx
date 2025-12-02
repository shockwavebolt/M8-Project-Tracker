import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { useProject } from "../projects/ProjectContext";

const TextArea = styled.textarea`
  all: unset; /* removes global inheritance */
  height: 200px;
  padding: 16px;
  align-self: stretch;
  border-radius: 16px;
  border: 3px solid #474747;
  background: #474747;
  color: white;

  &:focus {
    outline: none;
  }
`;

function Notes({ project }) {
  const { updateNotes } = useProject();
  const [notes, setNotes] = useState(project.notes);

  function handleSave() {
    updateNotes(project.id, notes);
  }
  return (
    <TextArea
      autoFocus={false}
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => e.key === "Enter" && handleSave()}
    ></TextArea>
  );
}

export default Notes;
