import React, { useState} from 'react';
import './App.css';

const statuses = ['To Do', 'In Progress', 'Done'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  
  const handleAddTask = () => {
    if (!newTask.title) return;
    const newTaskEntry = {
      ...newTask,
      id: Date.now()
    };
    setTasks([...tasks, newTaskEntry]);
    setNewTask({ title: '', description: '', status: 'To Do' });
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
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
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
