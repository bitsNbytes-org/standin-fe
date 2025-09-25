'use client';

import { useEffect, useState } from 'react';
import { RemoteParticipant, RoomEvent } from 'livekit-client';
import { useRoomContext } from '@livekit/components-react';
import { useDataChannel } from '@livekit/components-react';

export function KnowledgeFeed() {
  const room = useRoomContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    if (!room) return;
    const handleData = (payload: Uint8Array, participant?: RemoteParticipant) => {
      try {
        const decoded = JSON.parse(new TextDecoder().decode(payload));
        console.log('decoded', decoded);
        if (decoded.type === 'knowledgeTransfer') {
          setFeed((prev) => [...prev, { ...decoded, from: participant?.identity, ts: Date.now() }]);
        }
      } catch (err) {
        console.error('Invalid data packet:', err);
      }
    };

    room.on(RoomEvent.DataReceived, handleData);

    room.on(RoomEvent.RoomMetadataChanged, () => {
      const metadata = room.metadata;
      console.log('Room metadata changed', metadata);
    });

    room.on(RoomEvent.ChatMessage, (message) => {
      console.log('Chat message', message);
      console.log('Track unmuted');
    });

    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room]);

  // Receive all messages (no topic filtering)
  const { message: latestMessage, send } = useDataChannel((msg) =>
    console.log('message received', msg)
  );

  console.log('latestMessage', latestMessage);

  return (
    <div className="h-full overflow-y-auto border-l border-gray-300 p-4">
      <h2 className="mb-3 text-lg font-bold">Knowledge Transfer Feed</h2>
      <div className="space-y-4">
        {feed.map((item, i) => (
          <div key={i} className="rounded-md border bg-gray-50 p-3 shadow-sm">
            <p className="font-semibold">{item.from}:</p>
            <p className="mt-1">{item.narrative}</p>
            {item.extraData?.diagram && (
              <img src={item.extraData.diagram} alt="Diagram" className="mt-2 w-full rounded-md" />
            )}
            {item.extraData?.reference && (
              <a
                href={item.extraData.reference}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-blue-600 underline"
              >
                Reference
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
