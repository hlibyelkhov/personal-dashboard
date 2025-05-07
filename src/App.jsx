import { useEffect, useState } from 'react';
import WeatherWidget from './components/WeatherWidget';
import Notes from './components/Notes';
import Tasks from './components/Tasks';
import FinanceTracker from './components/FinanceTracker';
import YouTubeWidget from './components/YouTubeWidget';
import CalendarWidget from './components/CalendarWidget';
import { applyTheme, getStoredTheme } from './theme';

function App() {
  const [theme, setTheme] = useState(null);      // light / dark
  const [ready, setReady] = useState(false);     // блокирует рендер до загрузки темы

  useEffect(() => {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);
    setTheme(storedTheme);
    setReady(true);
  }, []);

  const handleToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  if (!ready) return null; // защита от мерцания/сбросов

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Мой Dashboard</h1>
        <button
          onClick={handleToggle}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === 'dark' ? '🌞 Светлая' : '🌙 Тёмная'}
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <WeatherWidget />
        <Tasks />
        <Notes />
        <FinanceTracker />
        <YouTubeWidget />
        <CalendarWidget />
      </div>
    </div>
  );
}

export default App;
