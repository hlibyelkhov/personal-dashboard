import { useEffect, useState } from 'react';
import axios from 'axios';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '410f1224697980d3b40cc97991be36c6'; // 👉 Вставь сюда свой ключ

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`
          )
          .then((res) => setWeather(res.data))
          .catch(() => setError('Не удалось получить данные о погоде'));
      },
      () => {
        setError('Доступ к геолокации отклонён');
      }
    );
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-2">Погода</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!weather ? (
        <p className="text-gray-500">Определение местоположения...</p>
      ) : (
        <div className="flex items-center space-x-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="иконка погоды"
          />
          <div>
            <p className="text-lg font-bold">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {weather.weather[0].description}, {weather.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
