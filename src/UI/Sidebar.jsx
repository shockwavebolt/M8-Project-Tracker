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
      padding: 24px;
      flex-direction: row;
      justify-content: center;
      gap: auto;
    }
  `;

  return (
    <StyledSidebar>
      {/* The logo placement should be replaced by the back button on mobile */}
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
