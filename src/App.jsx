import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import ProjectOverview from "./pages/ProjectOverview";
import { ProjectProvider } from "./projects/ProjectContext";
import CreateNewProject from "./pages/CreateNewProject";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
      <ProjectProvider>
        <BrowserRouter basename="/M8-Project-Tracker">
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="create-project" element={<CreateNewProject />} />
              <Route path="home" element={<Home />} />
              <Route path="archive" element={<Archive />} />
              <Route path="/archive/:id" element={<ProjectOverview />} />
              <Route path="/projects/:id" element={<ProjectOverview />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            className: "toast",
            success: {
              duration: 3000,
              iconTheme: {
                primary: "var(--color-toast-icon)", // the check color
                secondary: "var(--color-toast-icon-bg)", // the circle background
              },
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "1rem",
              maxWidth: "90vw",
              width: "fit-content",
              padding: "1rem 1.5rem",
              backgroundColor: "var(--color-toast-bg)",
              color: "var(--color-toast-text)",
            },
          }}
        />
      </ProjectProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
