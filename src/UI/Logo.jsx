import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  padding: 16px 12px;
  align-items: flex-start;
  border-radius: 8px;
  border-top: 2px solid var(--color-highlight);

  color: var(--color-black00);
  font-family: var(--font-01);
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  box-shadow: var(--shadow-md);

  &:hover {
    box-shadow: var(--shadow-gld);
  }
`;

function Logo() {
  return <StyledLogo>M8</StyledLogo>;
}

export default Logo;
