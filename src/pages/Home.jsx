import { useState } from "react";
import { useProject } from "../projects/ProjectContext";
import ProjectItem from "../projects/ProjectItem";
import Top from "../UI/Top";

function Home() {
  const { projects } = useProject();
  const [query, setQuery] = useState("");
  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <div className="flex flex-col  gap-8">
        <Top query={query} setQuery={setQuery}>
          All Projects
        </Top>
        <ul className="flex flex-col gap-4 p-3 border-t-2 border-[#474747]">
          {filteredProjects.map(
            (item) =>
              item.status != "Archived" && (
                <ProjectItem item={item} key={item.id} linkUrl={"projects"} />
              )
          )}
        </ul>
      </div>
    </>
  );
}

export default Home;
