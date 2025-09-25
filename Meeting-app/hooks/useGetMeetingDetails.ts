import { useEffect, useState } from 'react';
import { MeetingDetails } from '@/lib/types';
import { BASE_URL } from '@/lib/utils';

const useGetMeetingDetails = ({ meetingId }: { meetingId: string }) => {
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>({
    title: 'Test Meeting',
    description: 'Test Description',
    start_time: '2025-09-25T10:00:00',
    end_time: '2025-09-25T11:00:00',
    project_id: 1,
    attendees: ['test@test.com'],
    documentation_links: ['test@test.com'],
    additional_information: 'Test Additional Information',
    id: 1,
    meeting_link: 'test@test.com',
    google_calendar_event_id: 'test@test.com',
    status: 'test',
    created_at: '2025-09-25T10:00:00',
    updated_at: '2025-09-25T11:00:00',
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMeetingDetails = async () => {
      const response = await fetch(`${BASE_URL}/meeting/${meetingId}`);
      const data = await response.json();
      if (response.status === 200) {
        setMeetingDetails(data);
      }
      setIsLoading(false);
    };
    fetchMeetingDetails();
  }, [meetingId]);

  return { meetingDetails, isLoading };
};

export default useGetMeetingDetails;
