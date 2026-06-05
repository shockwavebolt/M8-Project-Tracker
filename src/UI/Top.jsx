// import { HiBarsArrowDown } from "react-icons/hi2";
import Button from "./Button";
import { HiPlus } from "react-icons/hi";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  border-radius: 32px;

  @media screen and (min-width: 768px) {
    width: 600px;
  }

  [data-theme="midnight"] & {
    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 32px;
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
      border-radius: 32px;
      border: 1px solid var(--color-white01);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  }

  [data-theme="midnight"] &:hover,
  [data-theme="midnight"] &:focus-within {
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
`;

const SearchInput = styled.input`
  height: 48px;
  font-size: 12px;
  width: 100%;

  background: none;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }

  [data-theme="midnight"] & {
    color: var(--color-white01);
    background: var(--color-black01);
    border: none;
    outline: none;
  }
`;

function Top({ query, setQuery, children }) {
  const navigate = useNavigate();

  function handleCreateProject() {
    navigate("/create-project");
  }

  return (
    <div className="flex flex-col gap-6">
      <Header>{children}</Header>
      <div className="flex  w-full lg:justify-between gap-2   items-center ">
        <div className="flex w-full items-center  gap-1 md:gap-4">
          <SearchWrapper>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchWrapper>
          {/* <Button variation="primary_2">
            <HiBarsArrowDown />
          </Button> */}
        </div>
        <span className="hidden lg:block">
          <Button variation="primary" onClick={handleCreateProject}>
            <HiPlus />
            <span className="whitespace-nowrap">New project</span>
          </Button>
        </span>
        {/* Mobile */}
        <span className="block lg:hidden">
          <Button variation="primary_2" onClick={handleCreateProject}>
            <HiPlus />
          </Button>
        </span>
      </div>
    </div>
  );
}

export default Top;
