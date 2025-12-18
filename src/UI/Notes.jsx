import styled from "styled-components";
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
  font-size: 16px;

  &:focus {
    outline: none;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    font-size: 12px;
    height: 150px;
    padding: 8px;
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
