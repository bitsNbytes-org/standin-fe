import type { TranscriptionSegment } from 'livekit-client';

export interface CombinedTranscription extends TranscriptionSegment {
  role: 'assistant' | 'user';
  receivedAtMediaTimestamp: number;
  receivedAt: number;
}
export type ThemeMode = 'dark' | 'light' | 'system';

export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  sandboxId?: string;
  agentName?: string;
}

export interface SandboxConfig {
  [key: string]:
    | { type: 'string'; value: string }
    | { type: 'number'; value: number }
    | { type: 'boolean'; value: boolean }
    | null;
}

export type Page = 'dashboard' | 'schedule-meeting' | 'projects' | 'meeting-room' | 'add-project';

export type MeetingDetails = {
  title: string;
  description: string;
  project_id: number;
  attendees: string[];
  documentation_links: string[];
  additional_information: string;
  id: number;
  start_time: string;
  end_time: string;
  meeting_link: string;
  google_calendar_event_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};
