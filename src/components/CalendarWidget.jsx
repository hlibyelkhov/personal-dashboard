import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarWidget() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800 h-full">
      <h2 className="text-xl font-semibold mb-4">Календарь</h2>
      <div className="react-calendar-wrapper">
        <Calendar
          onChange={setValue}
          value={value}
          className="w-full !bg-transparent !border-0 text-gray-900 dark:text-gray-100"
          // eslint-disable-next-line no-unused-vars
          tileClassName={({ date, view }) =>
            date.toDateString() === new Date().toDateString()
              ? 'bg-blue-500 text-white rounded-full'
              : undefined
          }
        />
      </div>
    </div>
  );
}

export default CalendarWidget;
