import { useEffect, useState } from 'react';
import { Loader2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MeetingDetails } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Logo } from './ui/logo';
import { WaveLoader } from './ui/wave-loader';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
  meetingDetails: MeetingDetails | null;
  isLoading: boolean;
}

export const Welcome = ({
  disabled,
  onStartCall,
  ref,
  meetingDetails,
  isLoading,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (!meetingDetails?.start_time) return;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const meetingTime = new Date(meetingDetails.start_time).getTime();
      const distance = meetingTime - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(
        `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds > 0 ? seconds + 's' : ''}`
      );

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [meetingDetails]);

  return (
    <section
      ref={ref}
      inert={disabled}
      className={cn(
        'bg-background fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center overflow-hidden text-center',
        disabled ? 'z-10' : 'z-20'
      )}
    >
      <div className="absolute top-0 left-0 p-8">
        <Logo />
      </div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <WaveLoader size={100} />
        </div>
      ) : (
        <>
          {meetingDetails ? (
            <div className="w-full">
              <div className="top-0 right-0 left-0 p-8 pl-12">
                <p className="animate-text-shimmer !bg-clip-text p-2 text-8xl font-bold text-transparent">
                  {meetingDetails.title}
                </p>
                <p className="text-2xl text-gray-400">{meetingDetails.description}</p>
              </div>
              <div className="text-2xl text-gray-400">
                <span>Scheduled for : </span>
                <span className="font-bold">{meetingDetails.attendees.join(', ')}</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={onStartCall}
                className="mt-10 w-64"
                // disabled={timeLeft !== null}
                disabled={false}
              >
                <div className="flex items-center justify-center">
                  Join Meeting
                  <WaveLoader size={30} />
                </div>
              </Button>

              <div
                className={`text-primary p-10 text-xl font-semibold transition-opacity duration-300 ${timeLeft ? 'opacity-100' : 'opacity-0'}`}
              >
                Your meeting will begin in{' '}
                <span className="min-w-10 text-yellow-500">{timeLeft}</span>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-3 overflow-hidden">
              <WaveLoader size={10} />
              <p className="animate-text-shimmer !bg-clip-text p-2 text-2xl font-semibold text-transparent">
                No meeting details found
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};
