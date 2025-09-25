'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Bot,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Link2,
  Loader2,
  Plus,
  Upload,
  X,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

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
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedAttendee, setSelectedAttendee] = useState('');
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);

  // Form states for adding new knowledge sources
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentText, setNewContentText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const projects = [
    'HR Onboarding Program',
    'Frontend Development',
    'Backend Systems',
    'Development Standards',
    'Security Training',
    'Project Management',
  ];

  const attendees = [
    'John Smith - New Developer',
    'Emma Johnson - Frontend Dev',
    'Michael Chen - Backend Dev',
    'Sarah Williams - Designer',
    'David Brown - QA Engineer',
    'Lisa Davis - Product Manager',
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

  // API call functions
  const addKnowledgeLink = async () => {
    if (!newLinkUrl.trim() || !newLinkTitle.trim()) return;

    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      type: 'link',
      title: newLinkTitle,
      content: newLinkUrl,
      status: 'loading',
      url: newLinkUrl,
    };

    setKnowledgeSources((prev) => [...prev, newSource]);

    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch('/api/knowledge-sources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'link',
          title: newLinkTitle,
          url: newLinkUrl,
          projectId: selectedProject,
        }),
      });

      if (!response.ok) throw new Error('Failed to add link');

      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id ? { ...source, status: 'success' } : source
        )
      );

      setNewLinkUrl('');
      setNewLinkTitle('');
    } catch (error) {
      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id
            ? { ...source, status: 'error', errorMessage: 'Failed to add link' }
            : source
        )
      );
    }
  };

  const addKnowledgeContent = async () => {
    if (!newContentTitle.trim() || !newContentText.trim()) return;

    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      type: 'content',
      title: newContentTitle,
      content: newContentText,
      status: 'loading',
    };

    setKnowledgeSources((prev) => [...prev, newSource]);

    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch('/api/knowledge-sources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'content',
          title: newContentTitle,
          content: newContentText,
          projectId: selectedProject,
        }),
      });

      if (!response.ok) throw new Error('Failed to add content');

      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id ? { ...source, status: 'success' } : source
        )
      );

      setNewContentTitle('');
      setNewContentText('');
    } catch (error) {
      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id
            ? { ...source, status: 'error', errorMessage: 'Failed to add content' }
            : source
        )
      );
    }
  };

  const addKnowledgeFile = async () => {
    if (!selectedFile) return;

    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      type: 'file',
      title: selectedFile.name,
      content: selectedFile.name,
      status: 'loading',
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
    };

    setKnowledgeSources((prev) => [...prev, newSource]);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', 'file');
      formData.append('projectId', selectedProject);

      // Mock API call - replace with actual API endpoint
      const response = await fetch('/api/knowledge-sources/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');

      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id ? { ...source, status: 'success' } : source
        )
      );

      setSelectedFile(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id
            ? { ...source, status: 'error', errorMessage: 'Failed to upload file' }
            : source
        )
      );
    }
  };

  const removeKnowledgeSource = (id: string) => {
    setKnowledgeSources((prev) => prev.filter((source) => source.id !== id));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Meeting scheduled:', {
      title: meetingTitle,
      project: selectedProject,
      attendee: selectedAttendee,
      date: selectedDate,
      time: selectedTime,
      knowledgeSources: knowledgeSources.filter((source) => source.status === 'success'),
    });
    router.push('dashboard');
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Attendee</Label>
                    <Select value={selectedAttendee} onValueChange={setSelectedAttendee} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendee" />
                      </SelectTrigger>
                      <SelectContent>
                        {attendees.map((attendee) => (
                          <SelectItem key={attendee} value={attendee}>
                            {attendee}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
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
                {/* Added Knowledge Sources */}
                {knowledgeSources.length > 0 && (
                  <div className="space-y-3">
                    <Label>Added Sources</Label>
                    <div className="space-y-2">
                      {knowledgeSources.map((source) => (
                        <div
                          key={source.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex flex-1 items-center space-x-3">
                            {source.type === 'link' && <Link2 className="h-4 w-4 text-blue-500" />}
                            {source.type === 'content' && (
                              <FileText className="h-4 w-4 text-green-500" />
                            )}
                            {source.type === 'file' && (
                              <Upload className="h-4 w-4 text-purple-500" />
                            )}

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{source.title}</p>
                              {source.type === 'link' && (
                                <p className="text-muted-foreground truncate text-xs">
                                  {source.url}
                                </p>
                              )}
                              {source.type === 'file' && source.fileSize && (
                                <p className="text-muted-foreground text-xs">
                                  {formatFileSize(source.fileSize)}
                                </p>
                              )}
                              {source.type === 'content' && (
                                <p className="text-muted-foreground truncate text-xs">
                                  {source.content.substring(0, 50)}...
                                </p>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              {source.status === 'loading' && (
                                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                              )}
                              {source.status === 'success' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {source.status === 'error' && (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}

                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeKnowledgeSource(source.id)}
                                className="p-1"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Knowledge Sources */}
                <Tabs defaultValue="link" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="link" className="flex items-center space-x-2">
                      <Link2 className="h-4 w-4" />
                      <span>Link</span>
                    </TabsTrigger>
                    <TabsTrigger value="content" className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Content</span>
                    </TabsTrigger>
                    <TabsTrigger value="file" className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>File</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="link" className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="link-title">Link Title</Label>
                        <Input
                          id="link-title"
                          placeholder="e.g., API Documentation"
                          value={newLinkTitle}
                          onChange={(e) => setNewLinkTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="link-url">URL</Label>
                        <Input
                          id="link-url"
                          placeholder="https://docs.example.com/guide"
                          type="url"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addKnowledgeLink}
                        disabled={!newLinkUrl.trim() || !newLinkTitle.trim()}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="content-title">Content Title</Label>
                        <Input
                          id="content-title"
                          placeholder="e.g., Style Guide"
                          value={newContentTitle}
                          onChange={(e) => setNewContentTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content-text">Content</Label>
                        <Textarea
                          id="content-text"
                          placeholder="Paste any relevant text, guidelines, or instructions..."
                          value={newContentText}
                          onChange={(e) => setNewContentText(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addKnowledgeContent}
                        disabled={!newContentTitle.trim() || !newContentText.trim()}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Content
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="file" className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="file-input">Select File</Label>
                        <Input
                          id="file-input"
                          type="file"
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx,.txt,.md,.json,.csv,.xlsx"
                          className="cursor-pointer"
                        />
                        <p className="text-muted-foreground text-xs">
                          Supported formats: PDF, DOC, DOCX, TXT, MD, JSON, CSV, XLSX
                        </p>
                      </div>
                      {selectedFile && (
                        <div className="bg-muted/50 rounded-lg border p-3">
                          <div className="flex items-center space-x-2">
                            <Upload className="text-muted-foreground h-4 w-4" />
                            <span className="text-sm font-medium">{selectedFile.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {formatFileSize(selectedFile.size)}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <Button
                        type="button"
                        onClick={addKnowledgeFile}
                        disabled={!selectedFile}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
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
                    <p className="text-sm">{selectedProject}</p>
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
              <Button type="submit" className="bg-primary hover:bg-primary/90 w-full">
                Schedule Meeting
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
