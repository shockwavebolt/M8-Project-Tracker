import styled from "styled-components";

const Container = styled.div`
  padding: 1px;
  width: 100px;
  height: 32px;
  border: 1px solid;
  border-color: #474747;
  border-radius: 9999px;
  overflow: hidden;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 60px;
    height: 20px;
  }
`;

const Bar = styled.div`
  height: 100%;

  border-radius: 9999px;
  background-color: #00a6fb;
  transition: all;
  transition-duration: 300ms;
`;

function ProgressionBar({ progress }) {
  return (
    <Container>
      <Bar style={{ width: `${progress}%` }} />
    </Container>
  );
}

export default ProgressionBar;
