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
  padding-right: 44px;

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

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: flex;
  pointer-events: none;
  color: var(--color-black00);

  [data-theme="midnight"] & {
    color: var(--color-white01);
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
            <SearchIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.969 15.97C5.731 14.491 4.984 12.586 4.984 10.509C4.984 5.812 8.796 2 13.492 2C18.188 2 22 5.812 22 10.509C22 15.204 18.188 19.017 13.492 19.017C11.414 19.017 9.508 18.27 8.031 17.032L3.281 21.781C3.135 21.927 2.943 22 2.75 22C2.163 22 2 21.463 2 21.25C2 21.058 2.073 20.866 2.22 20.719L6.969 15.97ZM20.499 10.509C20.499 6.641 17.359 3.502 13.492 3.502C9.625 3.502 6.485 6.641 6.485 10.509C6.485 14.375 9.625 17.516 13.492 17.516C17.359 17.516 20.499 14.375 20.499 10.509Z"
                  fill="currentColor"
                />
              </svg>
            </SearchIcon>
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
