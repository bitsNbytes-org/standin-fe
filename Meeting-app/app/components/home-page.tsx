import React from 'react';
import {
  Bot,
  Calendar,
  ChevronRight,
  Clock,
  FolderOpen,
  Plus,
  TrendingUp,
  Users,
  Video,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Page = 'home' | 'create-meeting' | 'projects' | 'projects-list' | 'meeting-room';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const upcomingMeetings = [
    {
      id: 1,
      title: 'New Employee Onboarding',
      project: 'HR Onboarding Program',
      attendee: 'John Smith',
      time: '2:00 PM Today',
      status: 'scheduled',
      type: 'onboarding',
    },
    {
      id: 2,
      title: 'React Training Session',
      project: 'Frontend Development',
      attendee: 'Emma Johnson',
      time: '10:00 AM Tomorrow',
      status: 'scheduled',
      type: 'training',
    },
    {
      id: 3,
      title: 'Code Review Guidelines',
      project: 'Development Standards',
      attendee: 'Michael Chen',
      time: '3:30 PM Tomorrow',
      status: 'scheduled',
      type: 'knowledge-transfer',
    },
  ];

  const stats = [
    {
      title: 'Total Meetings',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+2',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Hours Saved',
      value: '156',
      change: '+45%',
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      title: 'AI Sessions',
      value: '18',
      change: '+8',
      icon: Bot,
      color: 'text-purple-600',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in-progress':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'onboarding':
        return 'bg-primary/10 text-primary';
      case 'training':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'knowledge-transfer':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI meeting sessions</p>
        </div>
        <Button
          onClick={() => onNavigate('create-meeting')}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="mt-1 text-2xl">{stat.value}</p>
                    <p className="text-primary mt-1 text-sm">
                      <TrendingUp className="mr-1 inline h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Meetings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upcoming Meetings
                <Badge variant="secondary">{upcomingMeetings.length} scheduled</Badge>
              </CardTitle>
              <CardDescription>AI sessions scheduled for today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border-border hover:bg-accent/50 flex cursor-pointer items-center space-x-4 rounded-lg border p-4 transition-colors"
                  onClick={() => onNavigate('meeting-room')}
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {meeting.attendee
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center space-x-2">
                      <h4 className="truncate">{meeting.title}</h4>
                      <Badge variant="outline" className={getTypeColor(meeting.type)}>
                        {meeting.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground truncate text-sm">
                      {meeting.project} • {meeting.attendee}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Clock className="text-muted-foreground h-3 w-3" />
                      <span className="text-muted-foreground text-xs">{meeting.time}</span>
                      <Badge variant="secondary" className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="text-muted-foreground h-4 w-4" />
                </div>
              ))}

              {upcomingMeetings.length === 0 && (
                <div className="text-muted-foreground py-8 text-center">
                  <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No upcoming meetings</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => onNavigate('create-meeting')}
                  >
                    Schedule your first meeting
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('create-meeting')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('projects')}
              >
                <Users className="mr-2 h-4 w-4" />
                Add Project
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('projects-list')}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Manage Projects
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                  <div>
                    <p>AI session completed for "React Basics"</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p>New project "Mobile Development" created</p>
                    <p className="text-muted-foreground text-xs">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-2 h-2 w-2 rounded-full bg-orange-500"></div>
                  <div>
                    <p>Knowledge base updated for "HR Policies"</p>
                    <p className="text-muted-foreground text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
