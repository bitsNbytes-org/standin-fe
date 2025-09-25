import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import KnowledgeSource from './knowledge-source';

const KnowledgeSourceCard = ({ projectId }: { projectId: number }) => {
  return (
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
        <KnowledgeSource projectId={projectId} />
      </CardContent>
    </Card>
  );
};

export default KnowledgeSource;
