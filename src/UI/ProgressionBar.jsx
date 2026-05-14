import styled from "styled-components";

const Container = styled.div`
  padding: 2px;
  width: 100px;
  height: 32px;
  border-radius: 9999px;
  box-shadow: 0 4px 4px 0 var(--color-shadow) inset;
  border-bottom: 2px solid var(--color-highlight);

  overflow: hidden;

  [data-theme="midnight"] & {
    box-shadow: none;
    padding: 1px;
    background: var(--color-white01);
    border: 2px solid var(--color-teal);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 60px;
    height: 20px;
  }
`;

const Bar = styled.div`
  height: 100%;

  border-radius: 9999px;
  transition: all;
  transition-duration: 300ms;
`;

function ProgressionBar({ progress, status }) {
  return (
    <Container>
      <Bar
        style={{
          width: `${progress}%`,
          backgroundColor: `${status != "Archived" ? "var(--color-pulled)" : "var(--color-archived)"}`,
        }}
      />
    </Container>
  );
}

export default ProgressionBar;
