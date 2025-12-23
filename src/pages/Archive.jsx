import ArchivedItem from "../projects/ArchivedItem";
import { useProject } from "../projects/ProjectContext";
import ProjectItem from "../projects/ProjectItem";
import Top from "../UI/Top";

function Archive() {
  const { projects } = useProject();
  return (
    <>
      <div className="flex flex-col  gap-8">
        <Top>Archived projects</Top>
        <ul className="flex flex-col gap-4 p-3 border-t-2 border-[#474747]">
          {projects.map(
            (item) =>
              item.status === "Archived" && (
                <ProjectItem item={item} key={item.id} linkUrl={"archive"} />
              )
          )}
        </ul>
      </div>
    </>
  );
}

export default Archive;
