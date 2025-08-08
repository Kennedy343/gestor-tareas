import { useState } from 'react';
import Header from './components/Header/Header';
import ProjectsView from './components/ProjectsView';
import KanbanView from './components/KanbanView';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Estado global de proyectos
  const [projects, setProjects] = useState([]);

  return (
    <>
      <Header />
      {selectedProject ? (
        <KanbanView
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      ) : (
        <ProjectsView
          projects={projects}
          setProjects={setProjects}
          onSelectProject={setSelectedProject}
        />
      )}
    </>
  );
}

export default App;
