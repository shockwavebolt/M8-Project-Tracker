//import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./UI/Sidebar";
// import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
// import ProjectOverview from "./pages/ProjectOverview";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 161px 1fr;
  height: 100vh;
  background-color: #1e1e1e;
  padding: 24px;
`;

const Main = styled.div`
  padding: 64px 64px;
  background-color: #333333;
  border-radius: 32px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) inset;
  overflow: auto;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
