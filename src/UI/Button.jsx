import styled, { css } from "styled-components";

const variations = {
  primary: css`
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 32px;
    font-size: 16px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      font-size: 12px;
      padding: 16px 20px;
    }
  `,

  primary_2: css`
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 12px;
  `,

  secondary: css`
    display: flex;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;

    @media screen and (min-width: 320px) and (max-width: 768px) {
      padding: 16px;
    }
  `,

  tertiary_2: css`
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 12px;
    border-color: var(--color-elevated);
    border-width: 2px;
    border-style: solid;
  `,
};

const Button = styled.button`
  color: var(--color-black00);
  font-family: Urbanist;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  border-top: 2px solid var(--color-highlight);

  box-shadow: var(--shadow-md);
  transition:
    box-shadow 0.25s ease,
    background 0.25s ease;

  &:hover {
    box-shadow: var(--shadow-gld);
  }

  ${(props) => variations[props.variation]}

  [data-theme="midnight"] & {
    position: relative;
    color: var(--color-white01);
    border: 1px solid transparent;
    background: none;
    transition: box-shadow 0.25s ease;

    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: inherit;
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

    &::after {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: inherit;
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

export default Button;
