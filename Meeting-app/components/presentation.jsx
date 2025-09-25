import { useEffect, useState } from 'react';
import { useRoomContext } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';

const RenderPresentation = () => {
  const [currentData, setCurrentData] = useState({ heading: '', bullets: [] });

  const room = useRoomContext();

  useEffect(() => {
    if (room) {
      try {
        room.registerTextStreamHandler('chat', async (reader) => {
          const text = await reader.readAll();
          const parsedJson = JSON.parse(text);
          setCurrentData(parsedJson);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [room]);

  return (
    <div className="p-10">
      <p className="text-primary py-5 text-3xl font-bold">{currentData.heading}</p>
      <ul>
        {currentData.bullets.map((bullet, bulletIndex) => (
          <li key={bulletIndex} className="flex p-4 text-2xl">
            <span className="text-primary animate-pulse pr-3 font-extrabold">•</span>
            <span className="pl-3 text-white transition-all duration-300 ease-in-out">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderPresentation;
