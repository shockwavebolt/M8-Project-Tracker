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
        <div className="flex items-center  gap-1 md:gap-4">
          <input
            className="h-14 text-[12px] w-[600px] bg-white00 md:text-[16px]  "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button className="w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center border-t-2 border-(--color-highlight) shadow-(--shadow-md) cursor-pointer hover:shadow-(--shadow-gld)">
            <HiBarsArrowDown size={24} />
          </button>
        </div>
        <span className="hidden md:block">
          <Button variation="primary" onClick={handleCreateProject}>
            <HiPlus />
            <span>New project</span>
          </Button>
        </span>
        {/* Mobile */}
        <span className="block md:hidden">
          <Button variation="primary_2" onClick={handleCreateProject}>
            <HiPlus />
          </Button>
        </span>
      </div>
    </div>
  );
}

export default Top;
