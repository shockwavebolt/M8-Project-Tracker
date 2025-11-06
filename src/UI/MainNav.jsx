import { HiHome } from "react-icons/hi";
import { HiArchiveBox, HiCog6Tooth } from "react-icons/hi2";
import styled from "styled-components";

const NavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 96px;
  align-self: stretch;
`;

const StyledNavLink = styled.div`
  color: white;
  font-size: 32px;
`;

function MainNav() {
  return (
    <NavLayout>
      <StyledNavLink>
        <HiHome />
      </StyledNavLink>
      <StyledNavLink>
        <HiArchiveBox />
      </StyledNavLink>
      <StyledNavLink>
        <HiCog6Tooth />
      </StyledNavLink>
    </NavLayout>
  );
}

export default MainNav;
