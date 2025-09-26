import { Bot, User } from 'lucide-react';
import { MediaTiles } from '@/components/livekit/media-tiles';
import type { MeetingDetails } from '@/lib/types';
import { CardTitle } from './ui/card';

export const MeetingInfo = ({ meetingDetails }: { meetingDetails: MeetingDetails | null }) => {
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = end.getTime() - start.getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? hours + 'h' : ''} ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
  };

  if (!meetingDetails) return null;
  return (
    <div className="flex flex-col">
      <CardTitle className="flex items-center space-x-2 p-2">
        <User className="text-primary h-5 w-5" />
        <span>Participants (2)</span>
      </CardTitle>

      <div className="flex items-center justify-around gap-10 p-2">
        <div className="flex flex-col items-center">
          <div className="relative size-24 rounded-full border">
            <MediaTiles />
          </div>
          <p className="text-muted-foreground h-10 p-2 text-center text-lg font-bold">StandIn AI</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary relative my-auto flex size-[100px] items-center justify-center rounded-full">
            <p className="text-5xl font-bold text-black">
              {meetingDetails?.attendees[0]
                ?.split(' ')
                .slice(0, 2)
                .map((name) => name[0])
                .join('')
                .toUpperCase()}
            </p>
          </div>
          <p className="text-muted-foreground p-2 text-center text-lg font-bold">
            {meetingDetails?.attendees[0]
              ?.split('@')[0]
              .split('.')
              .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
              .join(' ')}
          </p>
        </div>
      </div>
      <div className="h-[0.1px] w-full bg-gray-500"></div>
      <div className="p-2">
        <CardTitle className="flex items-center space-x-2 py-2">
          <Bot className="text-primary h-5 w-5" />
          <span>Meeting Details</span>
        </CardTitle>
        <div className="mt-2">
          <div className="">
            <span className="text-muted-foreground min-w-20 text-sm">Project</span>
            <span className="text-muted-foreground ml-4 text-sm">: {meetingDetails?.title}</span>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Duration</span>
            <span className="text-muted-foreground ml-[7px] text-sm">
              : {calculateDuration(meetingDetails?.start_time, meetingDetails?.end_time)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Type</span>
            <span className="text-muted-foreground ml-8 text-sm">
              : {meetingDetails?.description}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4 h-[0.1px] w-full bg-gray-500"></div>
    </div>
  );
};
