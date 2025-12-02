import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const projectData = [
  {
    id: 11,
    name: " Hearth&Bean",
    description: "Coffee shop web design",
    status: "Active",
    tasks: [
      {
        id: 111,
        title: "Finish footer",
        completed: false,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
      {
        id: 112,
        title: "Design mid and large screens",
        completed: false,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
      {
        id: 113,
        title: "Wireframe",
        completed: true,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
    ],
    notes: "Might need to explore different color palettes in the future",
  },
  {
    id: 12,
    name: "LunaWear",
    description: "E-commerce fashion landing page",
    status: "Paused",
    tasks: [
      {
        id: 121,
        title: "Product grid layout",
        completed: true,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
      {
        id: 122,
        title: "Implement size filter",
        completed: false,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
      {
        id: 123,
        title: "Responsive hero section",
        completed: false,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
    ],
    notes: "Client requested a more editorial aesthetic for the hero section",
  },

  {
    id: 13,
    name: "NovaFit",
    description: "Personal trainer portfolio site",
    status: "Active",
    tasks: [
      {
        id: 131,
        title: "Homepage redesign",
        completed: true,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
      {
        id: 132,
        title: "Testimonials carousel",
        completed: false,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
      {
        id: 133,
        title: "Mobile optimization",
        completed: false,
        isRunning: false,
        lastStart: null,
        elapsed: 0,
      },
    ],
    notes: "Consider integrating a booking feature in later stages",
  },
];

function calculateProgress(project) {
  const total = project.tasks.length;
  const completed = project.tasks.filter((t) => t.completed).length;
  return total > 0 ? (completed / total) * 100 : 0;
}

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(
    projectData.map((project) => ({
      ...project,
      progress: calculateProgress(project),
    }))
  );

  function addNewProject(newProject) {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    toast.success("New Project Added");
  }

  function deleteProject(projectId) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => projectId != project.id)
    );
    toast.success("Project successfully deleted");
  }

  function addTask(projectId, newTask) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = [...project.tasks, newTask];
          return {
            ...project,
            tasks: updatedTasks,
            progress: calculateProgress({ ...project, tasks: updatedTasks }),
          };
        }
        return project;
      })
    );
    toast.success("New Task Added");
  }

  function toggleTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          return {
            ...project,
            tasks: updatedTasks,
            progress: calculateProgress({ ...project, tasks: updatedTasks }),
          };
        }
        return project;
      })
    );
  }

  function deleteTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
    toast.success("Task successfully deleted");
  }

  function editTask(projectId, taskId, newTitle) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : project
      )
    );
  }

  function updateStatus(projectId, newStatus) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  }

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function startTaskTimer(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        projectId === project.id
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                taskId === task.id
                  ? { ...task, isRunning: true, lastStart: Date.now() }
                  : task
              ),
            }
          : project
      )
    );
  }

  function pauseTaskTimer(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        projectId === project.id
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                taskId === task.id
                  ? {
                      ...task,
                      isRunning: false,
                      elapsed: task.elapsed + (Date.now() - task.lastStart),
                      lastStart: null,
                    }
                  : task
              ),
            }
          : project
      )
    );
  }

  function resetTaskTimer(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        projectId === project.id
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                taskId === task.id
                  ? { ...task, isRunning: false, lastStart: null, elapsed: 0 }
                  : task
              ),
            }
          : project
      )
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          tasks: project.tasks.map((t) => {
            if (t.isRunning && t.lastStart) {
              const now = Date.now();
              const diff = now - t.lastStart;

              return {
                ...t,
                elapsed: (t.elapsed || 0) + diff, // <--- SAFEGUARD
                lastStart: now,
              };
            }
            return t;
          }),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getProjectElapsed(project) {
    return project.tasks.reduce((sum, task) => sum + task.elapsed, 0);
  }

  function updateNotes(projectId, newNote) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, notes: newNote } : project
      )
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addTask,
        toggleTask,
        addNewProject,
        deleteProject,
        deleteTask,
        editTask,
        updateStatus,
        startTaskTimer,
        pauseTaskTimer,
        resetTaskTimer,
        getProjectElapsed,
        formatTime,
        updateNotes,
      }}
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
