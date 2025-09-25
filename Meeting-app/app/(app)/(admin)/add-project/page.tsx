'use client';

import React, { useState } from 'react';
import { ArrowLeft, FileText, FolderPlus, Link, Plus, Users, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Page = 'home' | 'create-meeting' | 'projects' | 'projects-list' | 'meeting-room';

interface ProjectsPageProps {
  onNavigate: (page: Page) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [knowledgeLinks, setKnowledgeLinks] = useState<string[]>(['']);
  const [knowledgeText, setKnowledgeText] = useState('');

  const availableMembers = [
    { id: '1', name: 'John Smith', role: 'Developer', initials: 'JS' },
    { id: '2', name: 'Emma Johnson', role: 'Frontend Dev', initials: 'EJ' },
    { id: '3', name: 'Michael Chen', role: 'Backend Dev', initials: 'MC' },
    { id: '4', name: 'Sarah Williams', role: 'Designer', initials: 'SW' },
    { id: '5', name: 'David Brown', role: 'QA Engineer', initials: 'DB' },
    { id: '6', name: 'Lisa Davis', role: 'Product Manager', initials: 'LD' },
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

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project created:', {
      name: projectName,
      description: projectDescription,
      members: selectedMembers,
      knowledgeLinks: knowledgeLinks.filter((link) => link.trim()),
      knowledgeText,
    });
    onNavigate('projects-list');
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('home')} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl">Create New Project</h1>
          <p className="text-muted-foreground">Set up a project for AI meeting sessions</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderPlus className="text-primary h-5 w-5" />
                  <span>Project Details</span>
                </CardTitle>
                <CardDescription>Basic information about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Frontend Development Training"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the project and its goals..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="text-primary h-5 w-5" />
                  <span>Team Members</span>
                </CardTitle>
                <CardDescription>
                  Select team members who will participate in AI sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {availableMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors ${
                        selectedMembers.includes(member.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-accent/50'
                      }`}
                      onClick={() => toggleMember(member.id)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={`text-xs ${
                            selectedMembers.includes(member.id)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{member.name}</p>
                        <p className="text-muted-foreground text-xs">{member.role}</p>
                      </div>
                      {selectedMembers.includes(member.id) && (
                        <div className="bg-primary flex h-4 w-4 items-center justify-center rounded-full">
                          <div className="bg-primary-foreground h-2 w-2 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
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
                <CardDescription>Add documentation and resources for AI sessions</CardDescription>
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
                  <Label htmlFor="knowledge-text">Project Guidelines & Information</Label>
                  <Textarea
                    id="knowledge-text"
                    placeholder="Add project-specific guidelines, coding standards, processes, or any information that should be referenced during AI sessions..."
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
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>Review your project details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectName && (
                  <div>
                    <Label className="text-muted-foreground text-xs">PROJECT NAME</Label>
                    <p className="text-sm">{projectName}</p>
                  </div>
                )}

                {selectedMembers.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground text-xs">TEAM MEMBERS</Label>
                    <div className="space-y-1">
                      {availableMembers
                        .filter((member) => selectedMembers.includes(member.id))
                        .map((member) => (
                          <div key={member.id} className="flex items-center space-x-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{member.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {knowledgeLinks.filter((link) => link.trim()).length > 0 && (
                  <div>
                    <Label className="text-muted-foreground text-xs">KNOWLEDGE SOURCES</Label>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs">
                        {knowledgeLinks.filter((link) => link.trim()).length} link(s)
                      </Badge>
                      {knowledgeText && (
                        <Badge variant="secondary" className="text-xs">
                          Custom guidelines
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button type="submit" className="bg-primary hover:bg-primary/90 w-full">
                Create Project
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('projects-list')}
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

export default ProjectsPage;
