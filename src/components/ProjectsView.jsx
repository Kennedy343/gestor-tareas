import { useState } from 'react';
import ProjectCard from './ProjectCard';
import NewProjectModal from './NewModalProject';

const ProjectsView = ({ projects, setProjects, onSelectProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = (project) => {
    setProjects([...projects, project]);
    setIsModalOpen(false);
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tus Proyectos</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          + Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">Aún no tienes proyectos creados.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => onSelectProject(project)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <NewProjectModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddProject}
        />
      )}
    </main>
  );
};

export default ProjectsView;
