import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import ProjectOverview from "./pages/ProjectOverview";
import { ProjectProvider } from "./projects/ProjectContext";
import CreateNewProject from "./projects/CreateNewProject";

function App() {
  return (
    <>
      <GlobalStyles />
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="create-project" element={<CreateNewProject />} />
              <Route path="home" element={<Home />} />
              <Route path="archive" element={<Archive />} />
              <Route path="/projects/:id" element={<ProjectOverview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </>
  );
}

export default App;
