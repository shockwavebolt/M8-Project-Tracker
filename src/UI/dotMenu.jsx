import styled from "styled-components";

const StyledDotMenu = styled.div`
  position: absolute;
  z-index: 50;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 16px;
  background-color: #1e1e1e;
  color: white;
  border-radius: 16px;
  border: 1px solid #474747;
  background: #1e1e1e;
  box-shadow: 0 5px 7px 4px rgba(0, 0, 0, 0.25);
  font-family: var(--font-02);
  font-size: 16px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    left: -30px;
    padding: 12px;
    gap: 12px;
    font-size: 12px;
  }
`;

export default StyledDotMenu;
