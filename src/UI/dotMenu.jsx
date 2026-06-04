import styled from "styled-components";

const StyledDotMenu = styled.div`
  flex-shrink: 0;
  display: flex;
  align-self: stretch;
  overflow: hidden;
  width: ${({ $open, $row }) => ($open ? ($row ? "120px" : "60px") : "0")};
  transition: width 0.3s ease;
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: ${({ $row }) => ($row ? "row" : "column")};
  height: 100%;
  padding: ${({ $row }) => ($row ? "16px" : "24px 16px")};
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: ${({ $row }) => ($row ? "120px" : "60px")};
  background: var(--color-white00);
  color: var(--color-black00);
  border-radius: 16px;
  border-top: 2px solid var(--color-highlight);
  box-shadow: var(--shadow-gld);

  font-family: var(--font-02);
  font-size: 16px;
  clip-path: ${({ $open }) =>
    $open
      ? "inset(-12px -12px -12px -12px round 16px)"
      : "inset(-12px 112% -12px -12px round 16px)"};
  transition: clip-path 0.3s ease;

  [data-theme="midnight"] & {
    background: var(--color-black03);
    color: var(--color-white01);
    border: 1px solid var(--color-white01);
    box-shadow: none;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 12px;
    gap: 12px;
    font-size: 12px;
  }
`;

export { MenuContent };
export default StyledDotMenu;
