import { HiBarsArrowDown } from "react-icons/hi2";
import Button from "./Button";
import { HiPlus } from "react-icons/hi";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Top({ children }) {
  const navigate = useNavigate();

  function handleCreateProject() {
    navigate("/create-project");
  }

  return (
    <>
      <Header>{children}</Header>
      <div className="flex justify-between items-center self-stretch">
        <div className="flex items-center gap-4">
          <input></input>
          <Button variation="secondary">
            <HiBarsArrowDown />
          </Button>
        </div>
        <Button variation="primary" onClick={handleCreateProject}>
          <HiPlus />
          <span>New project</span>
        </Button>
      </div>
    </>
  );
}

export default Top;
