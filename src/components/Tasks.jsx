import { useEffect, useState } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Загрузка из localStorage при запуске
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Сохранение в localStorage при изменении задач
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = { id: Date.now(), text: input, done: false };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Задачи</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          placeholder="Новая задача..."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2"
          >
            <span
              onClick={() => toggleDone(task.id)}
              className={`flex-1 cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 ml-4"
              title="Удалить"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
