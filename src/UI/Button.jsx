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
    background: #474747;
  `,

  secondary: css`
    display: flex;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    background: #474747;

    @media screen and (min-width: 320px) and (max-width: 768px) {
      padding: 16px;
    }
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
    @media screen and (min-width: 320px) and (max-width: 768px) {
      font-size: 12px;
      padding: 16px 20px;
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
