//import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./UI/Sidebar";
// import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
// import ProjectOverview from "./pages/ProjectOverview";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  height: 100vh;
  background-color: var(--color-white00);
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  position: fixed;
  width: 100%;

  [data-theme="midnight"] & {
    background-color: var(--color-black01);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    padding: 8px;

    & > :first-child {
      grid-row: 2;
    }

    & > :last-child {
      grid-row: 1;
      min-height: 0;
    }
  }
`;

const Main = styled.div`
  height: 100%;
  padding: 64px 64px;
  background-color: var(--color-white00);
  border-radius: 32px;
  box-shadow: 0 4px 4px 0 var(--color-shadow) inset;
  border-bottom: 2px solid var(--color-highlight);

  overflow: auto;

  [data-theme="midnight"] & {
    background-color: var(--color-black01);
    box-shadow: none;
    border: 1px solid transparent;
    background:
      linear-gradient(var(--color-black01), var(--color-black01)) padding-box,
      linear-gradient(to bottom, var(--color-mauve00), var(--color-white01))
        border-box;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 48px 24px;
    border-radius: 12px;
    overflow: auto;
  }
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
