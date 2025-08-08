import { useState } from 'react';
import TaskCard from './TaskCard';
import NewTaskModal from './NewTaskModal';
import EditTaskModal from './EditTaskModal';

const KanbanView = ({ project, onBack }) => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'Pendiente', tasks: [] },
    { id: 'in-progress', title: 'En Proceso', tasks: [] },
    { id: 'done', title: 'Completado', tasks: [] },
  ]);

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);

  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskColumnId, setTaskColumnId] = useState(null); // para saber columna donde está tarea

  // Abrir modal para nueva tarea
  const openNewTaskModal = (columnId) => {
    setActiveColumnId(columnId);
    setIsNewTaskModalOpen(true);
  };

  // Guardar nueva tarea
  const handleSaveNewTask = (task) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === activeColumnId
          ? { ...col, tasks: [...col.tasks, task] }
          : col
      )
    );
    setIsNewTaskModalOpen(false);
    setActiveColumnId(null);
  };

  // Función para eliminar tarea
const handleDeleteTask = (columnId, taskToDelete) => {
  setColumns((cols) =>
    cols.map((col) =>
      col.id === columnId
        ? {
            ...col,
            tasks: col.tasks.filter((task) => task !== taskToDelete),
          }
        : col
    )
  );
};


  // Abrir modal para editar tarea
  const openEditTaskModal = (columnId, task) => {
    setTaskColumnId(columnId);
    setTaskToEdit(task);
    setIsEditTaskModalOpen(true);
  };

  // Guardar tarea editada
  const handleSaveEditedTask = (updatedTask) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === taskColumnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task === taskToEdit ? updatedTask : task
              ),
            }
          : col
      )
    );
    setIsEditTaskModalOpen(false);
    setTaskToEdit(null);
    setTaskColumnId(null);
  };

  return (
    <main className="p-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50 transition"
      >
        <span className="text-lg">←</span>
        Volver a proyectos
      </button>

      <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
      <p className="text-gray-600 mb-6">{project.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">{column.title}</h3>

            <div className="space-y-2 min-h-[100px]">
              {column.tasks.length === 0 && (
                <p className="text-gray-400 italic">Sin tareas</p>
              )}
              {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => openEditTaskModal(column.id, task)}
                onDelete={() => handleDeleteTask(column.id, task)}
              />
            ))}

            </div>

            <button
              className="mt-4 w-full bg-indigo-500 text-white text-sm py-2 rounded hover:bg-indigo-600 transition"
              onClick={() => openNewTaskModal(column.id)}
            >
              + Agregar Tarea
            </button>
          </div>
        ))}
      </div>

      {isNewTaskModalOpen && (
        <NewTaskModal
          columnTitle={columns.find((c) => c.id === activeColumnId)?.title || ''}
          onClose={() => setIsNewTaskModalOpen(false)}
          onSave={handleSaveNewTask}
        />
      )}

      {isEditTaskModalOpen && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onClose={() => setIsEditTaskModalOpen(false)}
          onSave={handleSaveEditedTask}
        />
      )}
    </main>
  );
};

export default KanbanView;
