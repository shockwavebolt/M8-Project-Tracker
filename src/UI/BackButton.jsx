import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className="w-8 h-8 md:w-14 md:h-14 bg-[url('/src/UI/BackIcon.svg')] bg-contain bg-no-repeat cursor-pointer"
      onClick={() => navigate(-1)}
    ></button>
  );
}

export default BackButton;
