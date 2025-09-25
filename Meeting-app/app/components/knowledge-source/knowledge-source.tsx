import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Link2 } from 'lucide-react';
import { Upload } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { BASE_URL } from '@/lib/utils';

type KnowledgeSourceType = {
  id: number;
  content?: string;
  filename?: string;
  bucket?: string;
  project_id?: number;
  meeting_id?: number;
  doc_type?: string;
  created_at?: string;
  updated_at?: string;
  external_link?: string;
  source?: string;
};

const KnowledgeSource = ({ projectId }: { projectId?: number }) => {
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSourceType[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newContentText, setNewContentText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchKnowledgeSources = async () => {
      const response = await fetch(`${BASE_URL}/project/${projectId}/documents`);
      const data = await response.json();
      setKnowledgeSources(data);
    };
    fetchKnowledgeSources();
  }, [projectId]);

  const addKnowledgeLink = async () => {
    if (!newLinkUrl.trim()) return;

    const newSource: KnowledgeSourceType = {
      id: Date.now(),
      source: 'url',
      external_link: newLinkUrl,
    };

    setKnowledgeSources((prev) => [...prev, newSource]);

    try {
      // Mock API call - replace with actual API endpoint
      const formData = new FormData();
      formData.append('source', 'url');
      formData.append('url', newLinkUrl);
      formData.append('project_id', projectId?.toString() || '');

      const response = await fetch(`${BASE_URL}/document/import`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add link');

      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id ? { ...source, status: 'success' } : source
        )
      );

      setNewLinkUrl('');
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
    if (!newContentText.trim()) return;

    const newSource: KnowledgeSourceType = {
      id: Date.now(),
      content: newContentText,
      source: 'content',
    };

    setKnowledgeSources((prev) => [...prev, newSource]);

    try {
      // Mock API call - replace with actual API endpoint
      const formData = new FormData();
      formData.append('source', 'content');
      formData.append('content', newContentText);
      formData.append('project_id', projectId?.toString() || '');

      const response = await fetch(`${BASE_URL}/document/import`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add content');

      setKnowledgeSources((prev) =>
        prev.map((source) =>
          source.id === newSource.id ? { ...source, status: 'success' } : source
        )
      );

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

  const removeKnowledgeSource = (id: number) => {
    setKnowledgeSources(knowledgeSources.filter((source) => source.id !== id));
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

  const addKnowledgeFile = async () => {
    if (!selectedFile) return;

    const newSource: KnowledgeSourceType = {
      id: Date.now(),
      filename: selectedFile.name,
      source: 'file',
    };

    setKnowledgeSources((prev) => [...prev, newSource]);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('source', 'file');
      formData.append('project_id', projectId?.toString() || '');

      // Mock API call - replace with actual API endpoint
      const response = await fetch(`${BASE_URL}/document/import`, {
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

  return (
    <>
      {/* Added Knowledge Sources */}
      {knowledgeSources.length > 0 && (
        <div className="w-full space-y-3">
          <Label>Added Sources</Label>
          <div className="w-md space-y-2">
            {knowledgeSources.map((document) => (
              <div
                key={document.id}
                className="flex w-full max-w-full items-center gap-2 rounded-lg border p-3"
              >
                {document.source === 'url' && (
                  <Link2 className="h-4 w-4 flex-shrink-0 text-blue-500" />
                )}
                {document.source === 'content' && (
                  <FileText className="h-4 w-4 flex-shrink-0 text-green-500" />
                )}
                {document.source === 'file' && (
                  <Upload className="h-4 w-4 flex-shrink-0 text-purple-500" />
                )}

                <div className="min-w-0 flex-1 overflow-hidden">
                  {document.source === 'url' && (
                    <p className="text-muted-foreground w-full truncate text-xs">
                      {document.external_link}
                    </p>
                  )}
                  {document.source === 'file' && (
                    <p className="text-muted-foreground w-full truncate text-xs">
                      {document.filename}
                    </p>
                  )}
                  {document.source === 'content' && (
                    <p className="text-muted-foreground w-full truncate text-xs">
                      {document.content}
                    </p>
                  )}
                </div>

                <div className="flex flex-shrink-0 items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeKnowledgeSource(document.id)}
                    className="p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
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
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                placeholder="https://docs.example.com/guide"
                type="url"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
              />
            </div>
            {projectId && (
              <Button
                type="button"
                onClick={addKnowledgeLink}
                disabled={!newLinkUrl.trim()}
                className="w-full"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="space-y-3">
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
            {projectId && (
              <Button
                type="button"
                onClick={addKnowledgeContent}
                disabled={!newContentText.trim()}
                className="w-full"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            )}
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
            {projectId && (
              <Button
                type="button"
                variant="outline"
                onClick={addKnowledgeFile}
                disabled={!selectedFile}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default KnowledgeSource;
