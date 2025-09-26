'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Bot,
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  FileText,
  Link2,
  Mic,
  Upload,
} from 'lucide-react';
import KnowledgeSource from '@/app/components/knowledge-source/knowledge-source';
import { toastSuccess } from '@/components/alert-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BASE_URL, formatFileSize, voiceTranscript } from '@/lib/utils';

const attendees = [
  { name: 'Aravind Balakrishnan', email: 'aravindbalan222@gmail.com' },
  { name: 'Arjun B', email: 'arjun.b@keyvalue.systems' },
  { name: 'Jino Antony', email: 'jino.a@keyvalue.systems' },
  { name: 'Mathew V Kariath', email: 'mathew.v@keyvalue.systems' },
  { name: 'Nishanth K C', email: 'nishanth@keyvalue.systems' },
  { name: 'Ratheesha S', email: 'ratheesha@keyvalue.systems' },
  { name: 'Rose Joseph', email: 'rose.j@keyvalue.systems' },
  { name: 'Sidharth', email: 'sidharth.at@keyvalue.systems' },
];

const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
];

const durations = [
  '15 minutes',
  '30 minutes',
  '45 minutes',
  '1 hour',
  '1 hour 15 minutes',
  '1 hour 30 minutes',
  '1 hour 45 minutes',
  '2 hours',
  '2 hours 30 minutes',
  '3 hours',
];

interface KnowledgeSource {
  id: string;
  type: 'link' | 'content' | 'file';
  title: string;
  content: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string;
  url?: string;
  fileName?: string;
  fileSize?: number;
}

export default function ScheduleMeeting() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedAttendee, setSelectedAttendee] = useState('');
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);
  const [selectedDuration, setSelectedDuration] = useState('');

  // Form states for adding new knowledge sources
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newContentText, setNewContentText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Voice cloning states
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [voiceConsent, setVoiceConsent] = useState(false);

  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`${BASE_URL}/project`);
      const data = await response.json();
      setProjects(data);
    };
    setSelectedProject(projects[0]?.id);
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create proper ISO datetime strings
    const createDateTime = (date: Date, time: string): string => {
      const [hours, minutes] = time.split(':');
      const [timePeriod] = time.split(' ').slice(-1);
      let hour24 = parseInt(hours, 10);

      if (timePeriod === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (timePeriod === 'AM' && hour24 === 12) {
        hour24 = 0;
      }

      const dateTime = new Date(date);
      dateTime.setHours(hour24, parseInt(minutes, 10), 0, 0);
      return dateTime.toISOString();
    };

    const startDateTime = createDateTime(selectedDate!, selectedTime);

    // Calculate end time as 30 minutes after start time
    const startDateObj = new Date(startDateTime);
    const endDateObj = new Date(startDateObj.getTime() + 30 * 60 * 1000); // Add 30 minutes
    const endDateTime = endDateObj.toISOString();

    const formData = new FormData();
    formData.append('title', meetingTitle);
    formData.append('project_id', selectedProject);
    formData.append('description', description);
    formData.append('start_time', startDateTime);
    formData.append('end_time', endDateTime);
    formData.append('attendees', [selectedAttendee]);
    if (newLinkUrl) {
      formData.append('document_source', 'url');
      formData.append('document_url', newLinkUrl);
    }
    if (newContentText) {
      formData.append('document_source', 'content');
      formData.append('document_content', newContentText);
    }
    if (selectedFile) {
      formData.append('document_source', 'file');
      formData.append('document_file', selectedFile);
    }

    const response = await fetch(`${BASE_URL}/meeting/schedule`, {
      method: 'POST',
      body: formData,
    });

    toastSuccess({
      title: 'Meeting scheduled!!',
      description:
        'The meeting has been scheduled successfully and an email has been sent to the attendee',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error('Failed to schedule meeting');
    }

    router.push('dashboard');
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('dashboard')} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl">Schedule AI Meeting</h1>
          <p className="text-muted-foreground">Create a new AI-powered session</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="text-primary h-5 w-5" />
                  <span>Meeting Details</span>
                </CardTitle>
                <CardDescription>Configure your AI meeting session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., React Basics Training"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="e.g., This meeting is about the new features of the product"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select
                      value={selectedProject?.toString()}
                      onValueChange={setSelectedProject}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Attendee</Label>
                    <Select value={selectedAttendee} onValueChange={setSelectedAttendee} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select attendee" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {attendees.map((attendee) => (
                          <SelectItem key={attendee.email} value={attendee.email}>
                            {attendee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration} value={duration} className="w-full">
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="text-primary h-5 w-5" />
                  <span>Knowledge Sources</span>
                </CardTitle>
                <CardDescription>
                  Add links, content, or files for the AI to reference during the session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <KnowledgeSource
                  setUrlForMeeting={setNewLinkUrl}
                  setContentForMeeting={setNewContentText}
                  setFileForMeeting={setSelectedFile}
                />
              </CardContent>
            </Card>

            {/* Voice Cloning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="text-primary h-5 w-5" />
                  <span>Voice Cloning (Optional)</span>
                </CardTitle>
                <CardDescription>
                  Upload a voice sample to personalize your AI agent's voice. This feature allows
                  the AI to speak in your voice during meetings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Required Voice Sample Script</Label>
                    <div className="bg-muted/50 rounded-lg border p-3">
                      <p className="text-sm italic">"{voiceTranscript}"</p>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Please ensure your audio recording contains exactly this text for optimal
                      voice cloning results.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voice-file">Voice Sample Audio File</Label>
                    <Input
                      id="voice-file"
                      type="file"
                      onChange={(e) => setVoiceFile(e.target.files?.[0] || null)}
                      accept=".mp3,.wav,.m4a,.ogg,.flac"
                      className="cursor-pointer"
                    />
                    <p className="text-muted-foreground text-xs">
                      Supported formats: MP3, WAV, M4A, OGG, FLAC (max 10MB, 30-60 seconds
                      recommended)
                    </p>
                  </div>

                  {voiceFile && (
                    <div className="bg-muted/50 rounded-lg border p-3">
                      <div className="flex items-center space-x-2">
                        <Mic className="text-primary h-4 w-4" />
                        <span className="text-sm font-medium">{voiceFile.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {formatFileSize(voiceFile.size)}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {voiceFile && (
                    <>
                      <div className="flex items-start space-x-3 rounded-lg border bg-amber-50 p-4 dark:bg-amber-950/20">
                        <Checkbox
                          id="voice-consent"
                          checked={voiceConsent}
                          onCheckedChange={(checked) => setVoiceConsent(checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor="voice-consent"
                            className="cursor-pointer text-sm font-medium"
                          >
                            Voice Cloning Consent
                          </Label>
                          <p className="text-muted-foreground mt-1 text-xs">
                            I consent to the use of my voice for AI voice cloning purposes within
                            this application. I understand that my voice will be used to create a
                            synthetic version that can speak on my behalf during meetings.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Summary</CardTitle>
                <CardDescription>Review your session details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {meetingTitle && (
                  <div>
                    <Label className="text-muted-foreground text-xs">TITLE</Label>
                    <p className="text-sm">{meetingTitle}</p>
                  </div>
                )}

                {selectedProject && (
                  <div>
                    <Label className="text-muted-foreground text-xs">PROJECT</Label>
                    <p className="text-sm">
                      {projects.find((project) => project.id === Number(selectedProject))?.name}
                    </p>
                  </div>
                )}

                {selectedAttendee && (
                  <div>
                    <Label className="text-muted-foreground text-xs">ATTENDEE</Label>
                    <p className="text-sm">{selectedAttendee}</p>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div>
                    <Label className="text-muted-foreground text-xs">WHEN</Label>
                    <div className="flex items-center space-x-2 text-sm">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{format(selectedDate, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                )}

                {knowledgeSources.filter((source) => source.status === 'success').length > 0 && (
                  <div>
                    <Label className="text-muted-foreground text-xs">KNOWLEDGE SOURCES</Label>
                    <div className="space-y-1">
                      {knowledgeSources
                        .filter((source) => source.status === 'success')
                        .map((source) => (
                          <div key={source.id} className="flex items-center space-x-2">
                            <Badge
                              variant="secondary"
                              className="flex items-center space-x-1 text-xs"
                            >
                              {source.type === 'link' && <Link2 className="h-3 w-3" />}
                              {source.type === 'content' && <FileText className="h-3 w-3" />}
                              {source.type === 'file' && <Upload className="h-3 w-3" />}
                              <span className="max-w-[150px] truncate">{source.title}</span>
                            </Badge>
                            {source.type === 'link' && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0"
                                onClick={() => window.open(source.url, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 w-full"
                disabled={voiceFile ? !voiceConsent : false}
              >
                Send Meeting Invite
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push('dashboard')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
