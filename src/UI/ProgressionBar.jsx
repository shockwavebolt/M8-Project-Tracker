import styled from "styled-components";

const Container = styled.div`
  padding: 1px;
  width: 100px;
  height: 32px;
  border: 1.5px solid;
  border-color: #c2c2c2;
  border-radius: 9999px;
  overflow: hidden;
`;

const Bar = styled.div`
  height: 100%;

  border-radius: 9999px;
  background-color: #769fb6;
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
