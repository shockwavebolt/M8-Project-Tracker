import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  const StyledSidebar = styled.aside`
    display: flex;
    padding-top: 48px;
    flex-direction: column;
    align-items: center;
    gap: 96px;
    align-self: stretch;

    @media screen and (min-width: 320px) and (max-width: 768px) {
      padding: 24px;
      flex-direction: row;
      justify-content: center;
      gap: auto;
    }
  `;

  return (
    <StyledSidebar>
      {/* <Logo /> */}
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
