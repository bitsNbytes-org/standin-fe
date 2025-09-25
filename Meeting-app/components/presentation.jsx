import { useEffect, useState } from 'react';
import { useRoomContext } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';

const RenderPresentation = () => {
  const [currentData, setCurrentData] = useState({ heading: '', bullets: [] });

  const room = useRoomContext();

  useEffect(() => {
    if (room) {
      try {
        room.registerTextStreamHandler('my-topic', async (reader) => {
          const text = await reader.readAll();
          const parsedJson = JSON.parse(text);
          setCurrentData(parsedJson);
        });
      } catch (error) {
        toastAlert({
          title: 'Error registering text stream handler',
          description: `${error.name}: ${error.message}`,
        });
      }
    }
  }, [room]);

  return (
    <div className="presentation-slide">
      <p className="text-primary py-5 text-3xl font-bold">{currentData.heading}</p>
      <ul>
        {currentData.bullets.map((bullet, bulletIndex) => (
          <li key={bulletIndex} className="p-2 text-xl">
            <span className="text-primary pr-3">•</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderPresentation;
