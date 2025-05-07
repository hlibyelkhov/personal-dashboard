import { useEffect, useState } from 'react';
import axios from 'axios';

// ⚠️ ВСТАВЬ СЮДА СВОЙ КЛЮЧ
const API_KEY = 'AIzaSyCEa3DhtJq4sOd0z1bTCJkA1U3WTGgkZGU'; 

// Пример: канал Google Developers
const CHANNEL_ID = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';

function YouTubeWidget() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: API_KEY,
            channelId: CHANNEL_ID,
            part: 'snippet',
            order: 'date',
            maxResults: 5,
          },
        });
        setVideos(res.data.items);
      } catch (err) {
        setError('Ошибка загрузки видео');
        console.error(err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800 h-full">
      <h2 className="text-xl font-semibold mb-4">Последние видео</h2>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {videos.map((video) => (
          <li key={video.id.videoId || video.id.channelId}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="rounded mb-1 w-full"
              />
              <p className="text-sm">{video.snippet.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YouTubeWidget;
