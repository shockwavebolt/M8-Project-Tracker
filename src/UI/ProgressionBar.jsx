import styled from "styled-components";

const Container = styled.div`
  padding: 2px;
  width: 100px;
  height: 32px;
  background-color: #474747;
  border-radius: 9999px;
  overflow: hidden;
`;

const Bar = styled.div`
  height: 100%;
  width: 80%;
  border-radius: 9999px;
  background-color: #769fb6;
`;

function ProgressionBar() {
  return (
    <Container>
      <Bar />
    </Container>
  );
}

export default ProgressionBar;
