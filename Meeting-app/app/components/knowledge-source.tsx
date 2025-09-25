import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { FileText } from 'lucide-react';
import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const KnowledgeSource = () => {
  const [knowledgeLinks, setKnowledgeLinks] = useState<string[]>([]);
  const [knowledgeText, setKnowledgeText] = useState<string>('');

  const addKnowledgeLink = () => {
    setKnowledgeLinks([...knowledgeLinks, '']);
  };

  const updateKnowledgeLink = (index: number, value: string) => {
    setKnowledgeLinks(knowledgeLinks.map((link, i) => (i === index ? value : link)));
  };

  const removeKnowledgeLink = (index: number) => {
    setKnowledgeLinks(knowledgeLinks.filter((_, i) => i !== index));
  };

  return (
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
  );
};

export default KnowledgeSource;
