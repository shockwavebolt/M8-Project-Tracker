import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const projectData = [
  {
    id: 11,
    name: " Hearth&Bean",
    description: "Coffee shop web design",
    status: "Paused",
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
    status: "Archived",
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
    status: "Paused",
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
    })),
  );

  function addNewProject(newProject) {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    toast.success("Project Added");
  }

  function deleteProject(projectId) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => projectId != project.id),
    );
    toast.success("Projectdeleted");
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
            status:
              project.status === "Not Started" ? "Paused" : project.status,
          };
        }
        return project;
      }),
    );
    toast.success("Task Added");
  }

  function toggleTask(projectId, taskId) {
    const now = Date.now();
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id !== projectId) return project;

        const updatedTasks = project.tasks.map((task) => {
          if (task.id !== taskId) return task;
          const completing = !task.completed;
          return {
            ...task,
            completed: completing,
            ...(completing && task.isRunning
              ? {
                  isRunning: false,
                  elapsed: task.elapsed + (now - task.lastStart),
                  lastStart: null,
                }
              : {}),
          };
        });

        const anyRunning = updatedTasks.some(
          (t) => !t.completed && t.isRunning,
        );

        return {
          ...project,
          tasks: updatedTasks,
          progress: calculateProgress({ ...project, tasks: updatedTasks }),
          status:
            !anyRunning && project.status === "Active"
              ? "Paused"
              : project.status,
        };
      }),
    );
  }

  function deleteTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id !== projectId) return project;
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
        return {
          ...project,
          tasks: updatedTasks,
          progress: calculateProgress({ ...project, tasks: updatedTasks }),
        };
      }),
    );
    toast.success("Task deleted");
  }

  function editTask(projectId, taskId, newTitle) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task,
              ),
            }
          : project,
      ),
    );
  }

  function updateStatus(projectId, newStatus) {
    const project = projects.find((p) => p.id === projectId);

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project,
      ),
    );

    if (newStatus === "Archived") {
      toast.success("Project archived");
    } else if (newStatus === "Paused" && project?.status === "Archived") {
      toast.success("Project pulled");
    }
  }

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  }

  function startTaskTimer(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        projectId === project.id
          ? {
              ...project,
              status: "Active",
              tasks: project.tasks.map((task) =>
                taskId === task.id
                  ? { ...task, isRunning: true, lastStart: Date.now() }
                  : task,
              ),
            }
          : project,
      ),
    );
  }

  function pauseProject(projectId) {
    const now = Date.now();
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: "Paused",
              tasks: project.tasks.map((task) =>
                task.isRunning
                  ? {
                      ...task,
                      isRunning: false,
                      elapsed: task.elapsed + (now - task.lastStart),
                      lastStart: null,
                    }
                  : task,
              ),
            }
          : project,
      ),
    );
  }

  function pauseTaskTimer(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (projectId !== project.id) return project;

        const updatedTasks = project.tasks.map((task) =>
          taskId === task.id
            ? {
                ...task,
                isRunning: false,
                elapsed: task.elapsed + (Date.now() - task.lastStart),
                lastStart: null,
              }
            : task,
        );

        const anyRunning = updatedTasks.some(
          (t) => !t.completed && t.isRunning,
        );

        return {
          ...project,
          status:
            !anyRunning && project.status === "Active"
              ? "Paused"
              : project.status,
          tasks: updatedTasks,
        };
      }),
    );
  }

  function resetTaskTimer(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (projectId !== project.id) return project;

        const updatedTasks = project.tasks.map((task) =>
          taskId === task.id
            ? { ...task, isRunning: false, lastStart: null, elapsed: 0 }
            : task,
        );

        const anyRunning = updatedTasks.some(
          (t) => !t.completed && t.isRunning,
        );

        return {
          ...project,
          status:
            !anyRunning && project.status === "Active"
              ? "Paused"
              : project.status,
          tasks: updatedTasks,
        };
      }),
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects((prev) => {
        const hasRunning = prev.some((project) =>
          project.tasks.some((t) => t.isRunning),
        );
        if (!hasRunning) return prev;

        return prev.map((project) => ({
          ...project,
          tasks: project.tasks.map((t) => {
            if (t.isRunning && t.lastStart) {
              const now = Date.now();
              return {
                ...t,
                elapsed: t.elapsed + (now - t.lastStart),
                lastStart: now,
              };
            }
            return t;
          }),
        }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getProjectElapsed(project) {
    return project.tasks.reduce((sum, task) => sum + task.elapsed, 0);
  }

  function updateNotes(projectId, newNote) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, notes: newNote } : project,
      ),
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
        pauseProject,
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
