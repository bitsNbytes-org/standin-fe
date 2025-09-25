'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Bot,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  Link,
  Plus,
  X,
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
import { Textarea } from '@/components/ui/textarea';

export default function ScheduleMeetingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedAttendee, setSelectedAttendee] = useState('');
  const [knowledgeLinks, setKnowledgeLinks] = useState<string[]>(['']);
  const [knowledgeText, setKnowledgeText] = useState('');

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

  const addKnowledgeLink = () => {
    setKnowledgeLinks([...knowledgeLinks, '']);
  };

  const updateKnowledgeLink = (index: number, value: string) => {
    const updated = [...knowledgeLinks];
    updated[index] = value;
    setKnowledgeLinks(updated);
  };

  const removeKnowledgeLink = (index: number) => {
    setKnowledgeLinks(knowledgeLinks.filter((_, i) => i !== index));
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
      knowledgeLinks: knowledgeLinks.filter((link) => link.trim()),
      knowledgeText,
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
                  Provide information for the AI to reference during the session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Knowledge Links */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Link className="text-muted-foreground h-4 w-4" />
                    <Label>Documentation Links</Label>
                  </div>
                  {knowledgeLinks.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="https://docs.example.com/guide"
                        value={link}
                        onChange={(e) => updateKnowledgeLink(index, e.target.value)}
                        className="flex-1"
                      />
                      {knowledgeLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeKnowledgeLink(index)}
                          className="p-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addKnowledgeLink}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </div>

                {/* Knowledge Text */}
                <div className="space-y-2">
                  <Label htmlFor="knowledge-text">Additional Information</Label>
                  <Textarea
                    id="knowledge-text"
                    placeholder="Paste any relevant text, guidelines, or instructions that the AI should reference..."
                    value={knowledgeText}
                    onChange={(e) => setKnowledgeText(e.target.value)}
                    className="min-h-[120px]"
                  />
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

                {knowledgeLinks.filter((link) => link.trim()).length > 0 && (
                  <div>
                    <Label className="text-muted-foreground text-xs">KNOWLEDGE SOURCES</Label>
                    <div className="space-y-1">
                      {knowledgeLinks
                        .filter((link) => link.trim())
                        .map((link, index) => (
                          <Badge key={index} variant="secondary" className="block truncate text-xs">
                            {link}
                          </Badge>
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
