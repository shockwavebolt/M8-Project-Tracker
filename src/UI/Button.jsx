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
    background: #474747;
  `,
  secondary: css`
    display: flex;
    height: 40px;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    border-radius: 64px;
    font-size: 20px;
    padding-left: 2px;
    background: #474747;
  `,

  tertiary: css`
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 32px;
    font-size: 16px;
    border-color: #474747;
    border-width: 2px;
    border-style: solid;
  `,
};

const Button = styled.button`
  border: none;
  color: white;
  font-family: Urbanist;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  ${(props) => variations[props.variation]}
`;

export default Button;
