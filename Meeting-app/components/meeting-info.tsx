import { MediaTiles } from '@/components/livekit/media-tiles';

export const MeetingInfo = () => {
  const meetingInfo = {
    project: 'React Fundamentals',
    duration: '30 Minutes',
    type: 'Training Session',
    userName: 'Emma Johnson T',
  };

  return (
    <div className="flex flex-col">
      <p className="p-2 text-sm font-bold text-white">Participants (2)</p>

      <div className="flex items-center justify-around gap-10 p-2">
        <div className="flex flex-col items-center">
          <div className="relative size-24 rounded-full border">
            <MediaTiles />
          </div>
          <p className="h-10 p-2 text-center text-lg font-bold text-white">StandIn AI</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative my-auto flex size-[100px] items-center justify-center rounded-full bg-[#52e2a6]">
            <p className="text-5xl font-bold text-black">
              {meetingInfo.userName
                .split(' ')
                .slice(0, 2)
                .map((name) => name[0])
                .join('')
                .toUpperCase()}
            </p>
          </div>
          <p className="p-2 text-center text-lg font-bold text-white">{meetingInfo.userName}</p>
        </div>
      </div>
      <div className="h-[0.1px] w-full bg-gray-500"></div>
      <div className="p-2">
        <p className="py-2 text-sm font-bold text-white">Meeting Details</p>
        <div>
          <span className="text-md min-w-20 text-gray-400">Project</span>
          <span className="text-md ml-4 text-white">: {meetingInfo.project}</span>
        </div>
        <div>
          <span className="text-md text-gray-400">Duration</span>
          <span className="text-md ml-[7px] text-white">: {meetingInfo.duration}</span>
        </div>
        <div>
          <span className="text-md text-gray-400">Type</span>
          <span className="text-md ml-8 text-white">: {meetingInfo.type}</span>
        </div>
      </div>
      <div className="mb-4 h-[0.1px] w-full bg-gray-500"></div>
    </div>
  );
};
