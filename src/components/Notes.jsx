import { useEffect, useState } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  // Загрузка при запуске
  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === '') return;
    const newNote = { id: Date.now(), content: text };
    setNotes([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Заметки</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        placeholder="Напиши заметку..."
        className="w-full p-2 mb-2 rounded border dark:bg-gray-700 dark:border-gray-600"
      />

      <button
        onClick={addNote}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
      >
        Сохранить
      </button>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {notes.map((note) => (
          <li
            key={note.id}
            className="relative bg-gray-100 dark:bg-gray-700 rounded p-3"
          >
            <p className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
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

export default Notes;
