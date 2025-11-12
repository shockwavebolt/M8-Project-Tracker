import { useProject } from "../projects/ProjectContext";
import ProjectItem from "../projects/ProjectItem";
import Top from "../UI/Top";

function Home() {
  const { projects } = useProject();
  return (
    <>
      <div className="flex flex-col  gap-8">
        <Top>All Projects</Top>
        <ul className="flex flex-col gap-4 p-3 border-t-2 border-[#474747]">
          {projects.map((item) => (
            <ProjectItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
