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
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: var(--shadow-gld);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    font-size: 16px;
  }

  [data-theme="midnight"] & {
    position: relative;
    color: var(--color-white01);
    border: 1px solid transparent;
    background: var(--color-black01);
    transition: box-shadow 0.3s ease;

    /* gradient border layer */
    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 8px;
      padding: 1px;
      background: linear-gradient(
        to bottom,
        var(--color-mauve00),
        var(--color-white01)
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 1;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    /* solid border hover layer */
    &::after {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 8px;
      border: 1px solid var(--color-white01);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  }

  [data-theme="midnight"] &:hover {
    box-shadow: none;

    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
`;

function Logo() {
  return <StyledLogo>M8</StyledLogo>;
}

export default Logo;
