import { motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { AgentControlBar } from '@/components/livekit/agent-control-bar/agent-control-bar';
import { AppConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

export const MeetingController = ({
  appConfig,
  sessionStarted,
  messages,
  handleSendMessage,
  capabilities,
}: {
  appConfig: AppConfig;
  sessionStarted: boolean;
  messages: ReceivedChatMessage[];
  handleSendMessage: (message: string) => Promise<void>;
  capabilities: {
    supportsChatInput: boolean;
    supportsVideoInput: boolean;
    supportsScreenShare: boolean;
  };
}) => {
  return (
    <div className="bg-background bottom-0 left-0 z-50 px-3 pt-2 pb-3 md:px-12 md:pb-12">
      <motion.div
        key="control-bar"
        initial={{ opacity: 0, translateY: '100%' }}
        animate={{
          opacity: sessionStarted ? 1 : 0,
          translateY: sessionStarted ? '0%' : '100%',
        }}
        transition={{ duration: 0.3, delay: sessionStarted ? 0.5 : 0, ease: 'easeOut' }}
      >
        <div className="relative z-10 mx-auto w-full max-w-2xl">
          {appConfig.isPreConnectBufferEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: sessionStarted && messages.length === 0 ? 1 : 0,
                transition: {
                  ease: 'easeIn',
                  delay: messages.length > 0 ? 0 : 0.8,
                  duration: messages.length > 0 ? 0.2 : 0.5,
                },
              }}
              aria-hidden={messages.length > 0}
              className={cn(
                'absolute inset-x-0 -top-12 text-center',
                sessionStarted && messages.length === 0 && 'pointer-events-none'
              )}
            ></motion.div>
          )}

          <AgentControlBar
            capabilities={capabilities}
            onChatOpenChange={() => {}}
            onSendMessage={handleSendMessage}
          />
        </div>

        <div className="from-background border-background absolute top-0 left-0 h-12 w-full -translate-y-full bg-gradient-to-t to-transparent" />
      </motion.div>
    </div>
  );
};
