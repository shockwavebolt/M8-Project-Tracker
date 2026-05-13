import styled from "styled-components";
import { useState } from "react";
import { useProject } from "../projects/ProjectContext";

const TextArea = styled.textarea`
  all: unset; /* removes global inheritance */
  height: 200px;
  padding: 24px 16px 24px 16px;
  align-self: stretch;
  border-radius: 16px;
  box-shadow: 0 4px 4px 0 var(--color-shadow) inset;
  border-bottom: 2px solid var(--color-highlight);
  color: var(--color-black00);
  font-size: 16px;

  &:focus {
    outline: none;
    box-shadow: var(--shadow-focus) inset;
  }

  [data-theme="midnight"] & {
    background: var(--color-black03);
    color: var(--color-white01);
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
