import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRoomContext } from '@livekit/components-react';
import PresentationLogo from '@/app/assets/images/presentation_logo.svg';

const RenderPresentation = () => {
  const [currentData, setCurrentData] = useState({ heading: '', bullets: [] });

  const room = useRoomContext();

  useEffect(() => {
    if (room) {
      try {
        room.registerTextStreamHandler('chat', async (reader) => {
          const text = await reader.readAll();
          const parsedJson = JSON.parse(text);
          // setCurrentData(parsedJson.message);
          setCurrentData(parsedJson);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [room]);

  return (
    <div className="relative p-10">
      <p className="text-primary py-5 text-3xl font-bold">{currentData?.heading}</p>
      <ul>
        {currentData?.bullets.map((bullet, bulletIndex) => (
          <li key={bulletIndex} className="flex p-4 text-2xl">
            <span className="text-primary animate-pulse pr-3 font-extrabold">•</span>
            <span className="pl-3 text-white transition-all duration-300 ease-in-out">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
      <div className="absolute right-10 -bottom-20 rounded-2xl bg-white p-2">
        <Image priority src={PresentationLogo} alt="Presentation Logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default RenderPresentation;
