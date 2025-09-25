'use client';

import React, { useEffect } from 'react';
import { type AgentState, useRoomContext, useVoiceAssistant } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';
import useChatAndTranscription from '@/hooks/useChatAndTranscription';
import { useDebugMode } from '@/hooks/useDebug';
import type { AppConfig } from '@/lib/types';
import { ChatComponent } from './chat-component';
import { KnowledgeFeed } from './knowledge-feed';
import { ChatInput } from './livekit/chat/chat-input';
import { MeetingController } from './meeting-controler';
import { MeetingInfo } from './meeting-info';
import RenderPresentation from './presentation';

function isAgentAvailable(agentState: AgentState) {
  return agentState == 'listening' || agentState == 'thinking' || agentState == 'speaking';
}

interface SessionViewProps {
  appConfig: AppConfig;
  disabled: boolean;
  sessionStarted: boolean;
}

export const SessionView = ({
  appConfig,
  disabled,
  sessionStarted,
  ref,
}: React.ComponentProps<'div'> & SessionViewProps) => {
  const { state: agentState } = useVoiceAssistant();

  const { messages, send } = useChatAndTranscription();
  const room = useRoomContext();

  useDebugMode({
    enabled: process.env.NODE_END !== 'production',
  });

  async function handleSendMessage(message: string) {
    await send(message);
  }

  useEffect(() => {
    if (sessionStarted) {
      const timeout = setTimeout(() => {
        if (!isAgentAvailable(agentState)) {
          const reason =
            agentState === 'connecting'
              ? 'Agent did not join the room. '
              : 'Agent connected but did not complete initializing. ';

          toastAlert({
            title: 'Session ended',
            description: (
              <p className="w-full">
                {reason}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.livekit.io/agents/start/voice-ai/"
                  className="whitespace-nowrap underline"
                >
                  See quickstart guide
                </a>
                .
              </p>
            ),
          });
          room.disconnect();
        }
      }, 20_000);

      return () => clearTimeout(timeout);
    }
  }, [agentState, sessionStarted, room]);

  const { supportsChatInput, supportsVideoInput, supportsScreenShare } = appConfig;
  const capabilities = {
    supportsChatInput,
    supportsVideoInput,
    supportsScreenShare,
  };

  return (
    <section ref={ref} className="h-screen">
      <div className="top-0 right-0 left-0 bg-[#2d2d2d] p-8 pl-12">
        <p className="text-3xl font-bold text-white">React Fundamentals</p>
        <p className="text-xl text-gray-400">Training Session</p>
      </div>
      <div className="flex h-3/4 gap-10 p-10">
        <div className="bg-grey-950 h-full w-3/4 rounded-2xl border border-gray-700 bg-[#2d2d2d] p-10">
          <RenderPresentation />
          <div>{sessionStarted && room && <KnowledgeFeed />}</div>
        </div>
        <div className="h-full w-1/4 min-w-[400px] rounded-2xl border border-gray-700 bg-[#2d2d2d] p-2">
          <MeetingInfo />
          <div className="mx-2 h-[calc(100%-400px)] overflow-auto overflow-x-hidden rounded-2xl border border-gray-700 bg-black">
            <ChatComponent messages={messages} />
          </div>
          <div className="mx-2 pt-3">
            <ChatInput onSend={handleSendMessage} className="w-full" />
          </div>
        </div>
      </div>
      <MeetingController
        appConfig={appConfig}
        sessionStarted={sessionStarted}
        messages={messages}
        handleSendMessage={handleSendMessage}
        capabilities={capabilities}
      />
    </section>
  );
};
