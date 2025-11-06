import ArchivedItem from "../projects/ArchivedItem";
import Top from "../UI/Top";

function Archive() {
  return (
    <>
      <div className="flex flex-col  gap-8">
        <Top>Archived projects</Top>
        <div className="flex flex-col gap-10 p-3 border-t-2 border-[#474747]">
          <ArchivedItem />
        </div>
      </div>
    </>
  );
}

export default Archive;
