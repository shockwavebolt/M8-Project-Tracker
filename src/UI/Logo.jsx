import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  padding: 16px 12px;
  align-items: flex-start;
  border-radius: 8px;
  border: 2px solid #adadad;
  color: #fff;
  font-family: var(--font-01);
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

function Logo() {
  return <StyledLogo>M8</StyledLogo>;
}

export default Logo;
