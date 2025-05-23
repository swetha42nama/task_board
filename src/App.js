
import React, { useState } from 'react';
import './App.css';

const statuses = ['To Do', 'In Progress', 'Done'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', status: '' });

  const handleAddTask = () => {
    if (!newTask.title) return;
    const newTaskEntry = {
      ...newTask,
      id: Date.now()
    };
    setTasks([...tasks, newTaskEntry]);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description, status: task.status });
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editTaskId ? { ...task, ...editedTask } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditedTask({ title: '', description: '', status: '' });
  };

  const handleDrop = (status) => {
    const updatedTasks = tasks.map(task =>
      task.id === draggedTaskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setDraggedTaskId(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Task Management Dashboard</h1>
        <div className="new-task-form">
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button onClick={handleAddTask}>Add New Task</button>
        </div>
      </header>

      <div className="board">
        {statuses.map(status => (
          <div
            key={status}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
          >
            <h2>{status}</h2>
            <div className="task-list">
              {tasks.filter(task => task.status === status).map(task => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={() => setDraggedTaskId(task.id)}
                >
                  {editTaskId === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                      />
                      <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      />
                      <select
                        value={editedTask.status}
                        onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button onClick={handleUpdateTask}>Update</button>
                      <button onClick={() => setEditTaskId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <div className="task-actions">
                        <button onClick={() => handleEditTask(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
