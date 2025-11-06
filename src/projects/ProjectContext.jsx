import { createContext, useContext, useState } from "react";

const projectData = [
  {
    id: 11,
    name: " Hearth&Bean",
    description: "Coffee shop web design",
    status: "Active",
    time: "12h45m",
    tasks: [
      { id: 111, title: "Finish footer", completed: false },
      { id: 112, title: "Design mid and large screens", completed: false },
      { id: 113, title: "Wireframe", completed: true },
    ],
    notes: "Might need to explore different color palettes in the future",
  },
  {
    id: 12,
    name: "LunaWear",
    description: "E-commerce fashion landing page",
    status: "Paused",
    time: "9h10m",
    tasks: [
      { id: 121, title: "Product grid layout", completed: true },
      { id: 122, title: "Implement size filter", completed: false },
      { id: 123, title: "Responsive hero section", completed: false },
    ],
    notes: "Client requested a more editorial aesthetic for the hero section",
  },

  {
    id: 13,
    name: "NovaFit",
    description: "Personal trainer portfolio site",
    status: "Active",
    time: "16h30m",
    tasks: [
      { id: 131, title: "Homepage redesign", completed: true },
      { id: 132, title: "Testimonials carousel", completed: false },
      { id: 133, title: "Mobile optimization", completed: false },
    ],
    notes: "Consider integrating a booking feature in later stages",
  },
];

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(projectData);

  function addTask(projectId, newTask) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      )
    );
  }

  function toggleTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : project
      )
    );
  }

  function addNewProject(newProject) {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  }

  return (
    <ProjectContext.Provider
      value={{ projects, addTask, toggleTask, addNewProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  return context;
}

export { ProjectProvider, useProject };
