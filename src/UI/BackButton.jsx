import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBackButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid var(--color-highlight);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  color: var(--color-black00);

  &:hover {
    box-shadow: var(--shadow-gld);
  }

  [data-theme="midnight"] & {
    color: var(--color-white01);
    border: 2px solid var(--color-highlight);
  }

  [data-theme="midnight"] &:hover {
    box-shadow: none;
    border: 2px solid var(--color-white01);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

function BackButton() {
  const navigate = useNavigate();
  return (
    <StyledBackButton onClick={() => navigate("/home")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
      >
        <path
          d="M17.0129 7.69123H3.98125L9.67458 1.9979C10.1296 1.5429 10.1296 0.796233 9.67458 0.341233C9.45661 0.122772 9.16069 0 8.85208 0C8.54348 0 8.24755 0.122772 8.02958 0.341233L0.34125 8.02957C-0.11375 8.48457 -0.11375 9.21957 0.34125 9.67457L8.02958 17.3629C8.48458 17.8179 9.21958 17.8179 9.67458 17.3629C10.1296 16.9079 10.1296 16.1729 9.67458 15.7179L3.98125 10.0246H17.0129C17.6546 10.0246 18.1796 9.49957 18.1796 8.8579C18.1796 8.21623 17.6546 7.69123 17.0129 7.69123Z"
          fill="currentColor"
        />
      </svg>
    </StyledBackButton>
  );
}

export default BackButton;
