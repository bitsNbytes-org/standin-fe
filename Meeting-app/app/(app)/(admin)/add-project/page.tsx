'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, FolderPlus, Link, Plus, Users, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BASE_URL } from '@/lib/utils';

export function ProjectsPage() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${BASE_URL}/project`, {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        description: projectDescription,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('projects');
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('dashboard')} className="p-2">
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
                onClick={() => router.push('projects')}
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
