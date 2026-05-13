import styled from "styled-components";

const Header = styled.h1`
  color: var(--color-black00);
  font-family: var(--font-01);
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  [data-theme="midnight"] & {
    color: var(--color-white01);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    font-size: 24px;
  }
`;

export default Header;
