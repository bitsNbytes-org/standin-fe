import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { cn } from '@/lib/utils';
import { ChatEntry } from './livekit/chat/chat-entry';
import { ChatMessageView } from './livekit/chat/chat-message-view';

export const ChatComponent = ({ messages }: { messages: ReceivedChatMessage[] }) => {
  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  useEffect(() => {
    itemRefs.current[`${messages[messages.length - 1]?.id}`]?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  return (
    <ChatMessageView
      className={cn(
        'right-0 h-full min-h-svh max-w-2xl translate-y-0 px-3 pt-32 pb-40 shadow-2xl transition-[opacity,translate] delay-200 duration-300 ease-out md:px-0 md:pt-36 md:pb-48'
      )}
    >
      <div className="space-y-3 whitespace-pre-wrap">
        <AnimatePresence>
          {messages.map((message: ReceivedChatMessage) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 1, height: 'auto', translateY: 0.001 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                borderRadius: '10px',
                margin: '10px',
                padding: '2px',
                borderLeft: '1px solid black',
                borderTop: '1px solid darkslategrey',
              }}
            >
              <div
                ref={(el) => {
                  itemRefs.current[`${message.id}`] = el;
                }}
              >
                <ChatEntry hideName key={message.id} entry={message} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ChatMessageView>
  );
};
