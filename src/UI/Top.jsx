import { HiBarsArrowDown } from "react-icons/hi2";
import Button from "./Button";
import { HiPlus } from "react-icons/hi";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Top({ query, setQuery, children }) {
  const navigate = useNavigate();

  function handleCreateProject() {
    navigate("/create-project");
  }

  return (
    <div className="flex flex-col gap-6">
      <Header>{children}</Header>
      <div className="flex justify-between gap-1   items-center self-stretch">
        <div className="flex w-full items-center  gap-1 md:gap-4">
          <input
            className="h-12 text-[12px] w-[300px] md:w-[600px] bg-white00 md:h-12 md:text-[16px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <Button variation="primary_2">
            <HiBarsArrowDown />
          </Button>
          {/* <button className="w-10 h-10 p- rounded-full md:w-14 md:h-14  flex items-center justify-center border-t-2 border-(--color-highlight) shadow-(--shadow-md) cursor-pointer hover:shadow-(--shadow-gld)">
            <HiBarsArrowDown />
          </button> */}
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
