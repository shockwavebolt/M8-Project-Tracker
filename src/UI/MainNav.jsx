import { HiHome } from "react-icons/hi";
import { HiArchiveBox, HiCog6Tooth } from "react-icons/hi2";
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 96px;
  align-self: stretch;
  padding-top: 24px;
  padding-bottom: 24px;
  box-shadow: var(--shadow-md);
  border-radius: 32px;
  border-top: 2px solid var(--color-highlight);

  &:hover {
    box-shadow: var(--shadow-gld);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    flex-direction: row;
  }
`;

const StyledNavLink = styled.div`
  color: var(--color-black00);
  font-size: 32px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    font-size: 24px;
  }
`;

function MainNav() {
  const navigate = useNavigate();
  return (
    <NavLayout>
      {/* <span className="block md:hidden">
        <BackButton />
      </span> */}
      <StyledNavLink
        className="cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <HiHome />
      </StyledNavLink>
      <StyledNavLink
        className="cursor-pointer"
        onClick={() => navigate("/archive")}
      >
        <HiArchiveBox />
      </StyledNavLink>
      <StyledNavLink>
        <HiCog6Tooth />
      </StyledNavLink>
    </NavLayout>
  );
}

export default MainNav;
