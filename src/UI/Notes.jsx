import styled from "styled-components";
import { useState } from "react";
import { useProject } from "../projects/ProjectContext";

const NotesWrapper = styled.div`
  position: relative;
  align-self: stretch;

  [data-theme="midnight"] & {
    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 16px;
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
      border-radius: 16px;
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

const TextArea = styled.textarea`
  all: unset; /* removes global inheritance */
  display: block;
  width: 100%;
  box-sizing: border-box;
  height: 200px;
  padding: 24px 16px 24px 16px;
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
    background: none;
    color: var(--color-white01);
    border: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    font-size: 12px;
    height: 150px;
    padding: 16px 8px 16px 8px;
  }
`;

function Notes({ project }) {
  const { updateNotes } = useProject();
  const [notes, setNotes] = useState(project.notes);

  function handleSave() {
    updateNotes(project.id, notes);
  }
  return (
    <NotesWrapper>
      <TextArea
        autoFocus={false}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
      ></TextArea>
    </NotesWrapper>
  );
}

export default Notes;
