'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Edit,
  ExternalLink,
  FileText,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import KnowledgeSource from '@/app/components/knowledge-source/knowledge-source';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/lib/utils';

const projects = [
  {
    id: 1,
    name: 'HR Onboarding Program',
    description:
      'Complete onboarding process for new hires including company policies, benefits, and team introductions.',
    members: [
      { name: 'Sarah Wilson', role: 'HR Manager', initials: 'SW' },
      { name: 'John Smith', role: 'New Employee', initials: 'JS' },
    ],
    knowledgeLinks: [
      'https://company.com/handbook',
      'https://benefits.company.com',
      'https://policies.company.com',
    ],
    sessionsCount: 8,
    lastActivity: '2 hours ago',
    status: 'active',
  },
  {
    id: 2,
    name: 'Frontend Development',
    description: 'React, TypeScript, and modern frontend development practices and standards.',
    members: [
      { name: 'Emma Johnson', role: 'Frontend Lead', initials: 'EJ' },
      { name: 'Michael Chen', role: 'Developer', initials: 'MC' },
      { name: 'Lisa Davis', role: 'Intern', initials: 'LD' },
    ],
    knowledgeLinks: [
      'https://react.dev/docs',
      'https://typescript.org/docs',
      'https://github.com/company/frontend-guidelines',
    ],
    sessionsCount: 12,
    lastActivity: '1 day ago',
    status: 'active',
  },
  {
    id: 3,
    name: 'Security Training',
    description: 'Cybersecurity awareness and best practices for all employees.',
    members: [
      { name: 'David Brown', role: 'Security Officer', initials: 'DB' },
      { name: 'All Employees', role: 'Participants', initials: 'AE' },
    ],
    knowledgeLinks: ['https://security.company.com/training', 'https://nist.gov/cybersecurity'],
    sessionsCount: 24,
    lastActivity: '3 days ago',
    status: 'active',
  },
  {
    id: 4,
    name: 'Legacy System Migration',
    description: 'Knowledge transfer for migrating from legacy systems to modern architecture.',
    members: [
      { name: 'Senior Devs', role: 'Knowledge Holders', initials: 'SD' },
      { name: 'New Team', role: 'Recipients', initials: 'NT' },
    ],
    documents: [
      'https://wiki.company.com/legacy-docs',
      'https://architecture.company.com/migration',
    ],
    sessionsCount: 6,
    lastActivity: '1 week ago',
    status: 'completed',
  },
];

export function ProjectsList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectList, setProjectList] = useState<any[]>([]);

  const fetchProjects = async () => {
    const response = await fetch(`${BASE_URL}/project`);
    const data = await response.json();
    setProjectList(
      data.map((project: any, index: number) => ({
        ...project,
        status: 'active',
        sessionsCount: 0,
        members: projects[index].members,
      }))
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(
    () =>
      projectList.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [projectList, searchTerm]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('dashboard')}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl">Projects</h1>
            <p className="text-muted-foreground">Manage your AI meeting projects</p>
          </div>
        </div>
        <Button
          onClick={() => router.push('add-project')}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="text-sm">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="gap-3 transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-lg">{project.name}</CardTitle>
                  <div className="mt-1 flex items-center space-x-2">
                    <Badge variant="secondary" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {project.sessionsCount} sessions
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-2 text-sm">
                {project.description}
              </CardDescription>

              {/* Team Members */}
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <Users className="text-muted-foreground h-3 w-3" />
                  <span className="text-muted-foreground text-xs">Team</span>
                </div>
                <div className="flex -space-x-2">
                  {project.members?.slice(0, 3).map((member: any, index: number) => (
                    <Avatar key={index} className="border-background h-6 w-6 border-2">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.members?.length > 3 && (
                    <div className="bg-muted border-background flex h-6 w-6 items-center justify-center rounded-full border-2">
                      <span className="text-muted-foreground text-xs">
                        +{project.members?.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Knowledge Sources */}
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <FileText className="text-muted-foreground h-3 w-3" />
                  <span className="text-muted-foreground text-xs">Knowledge Sources</span>
                </div>
                <div className="space-y-1">
                  {project.documents?.slice(0, 2).map((document: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <span className="flex-shrink-0">
                        <ExternalLink className="text-muted-foreground h-3 w-3" />
                      </span>
                      <span className="text-muted-foreground truncate">{document.filename}</span>
                    </div>
                  ))}
                  {project.documents?.length > 2 && (
                    <span className="text-muted-foreground text-xs">
                      +{project.documents.length - 2} more sources
                    </span>
                  )}
                </div>
              </div>

              {/* Last Activity */}
              <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Last activity: {project.lastActivity}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedProject(project)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Knowledge Sources
                </Button>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push('schedule-meeting')}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <div className="bg-muted mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
            <Search className="text-muted-foreground h-8 w-8" />
          </div>
          <h3 className="mb-2 text-lg">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Create your first project to get started'}
          </p>
          <Button
            onClick={() => router.push('projects')}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      )}

      {/* Add Knowledge Sources Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="text-primary h-5 w-5" />
              <span>Knowledge Sources</span>
            </DialogTitle>
            <DialogDescription>
              Add links, content, or files for the AI to reference during the session
            </DialogDescription>
          </DialogHeader>
          <KnowledgeSource projectId={selectedProject?.id} />
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      {/* <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project: {selectedProject?.name}</DialogTitle>
            <DialogDescription>Update project details and knowledge sources</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Edit functionality will be implemented here. This would include:
            </p>
            <ul className="text-muted-foreground ml-4 space-y-1 text-sm">
              <li>• Update project name and description</li>
              <li>• Modify team members</li>
              <li>• Add/remove knowledge sources</li>
              <li>• Update project settings</li>
            </ul>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default ProjectsList;
