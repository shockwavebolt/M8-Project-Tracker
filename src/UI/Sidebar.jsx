import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  const StyledSidebar = styled.aside`
    display: flex;
    padding-top: 40px;
    flex-direction: column;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    gap: 96px;
    align-self: stretch;

    @media screen and (min-width: 320px) and (max-width: 768px) {
      width: 100%;
      padding: 12px 24px 12px 24px;
      flex-direction: row;
      justify-content: space-between;
      gap: auto;
    }
  `;

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
