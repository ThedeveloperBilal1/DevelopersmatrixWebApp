'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw,
  Mail,
  FileText
} from 'lucide-react';

export default function CoverLetterClient() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    applicantName: '',
    email: '',
    phone: '',
    experience: '',
    skills: ''
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const letter = `${formData.applicantName}
${formData.email} | ${formData.phone}

${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

${formData.company}

Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.company}. With ${formData.experience || 'extensive experience'} in the field, I am confident that my skills and passion make me an excellent candidate for this role.

${formData.jobDescription ? `After reviewing the job requirements, I am excited about the opportunity to contribute to ${formData.company}'s mission. My background includes ${formData.skills || 'relevant expertise'} that directly aligns with what you're seeking.` : ''}

In my previous roles, I have consistently delivered results and demonstrated the ability to adapt to new challenges. I am particularly drawn to ${formData.company}'s reputation for innovation and would welcome the opportunity to bring my expertise to your team.

Key highlights of my qualifications include:
• Proven track record of ${formData.experience || 'professional success'}
• Strong skills in ${formData.skills || 'relevant areas'}
• Excellent communication and collaboration abilities
• Commitment to continuous learning and improvement

I am excited about the possibility of contributing to ${formData.company} and would welcome the opportunity to discuss how my background aligns with your needs. Thank you for considering my application.

Best regards,
${formData.applicantName}`;

    setGeneratedLetter(letter);
    setIsGenerating(false);
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Cover Letter Generator
          </CardTitle>
          {generatedLetter && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Job Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="Google"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here for a more tailored cover letter..."
                  rows={4}
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Background</h3>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Summary</Label>
                <Textarea
                  id="experience"
                  placeholder="e.g., 5 years of full-stack development experience..."
                  rows={2}
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <Input
                  id="skills"
                  placeholder="React, Node.js, Python, AWS..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>
            </div>

            <Button 
              onClick={generateCoverLetter}
              disabled={isGenerating || !formData.jobTitle || !formData.company || !formData.applicantName}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Generated Cover Letter</h3>
              {generatedLetter && (
                <Badge variant="outline" className="border-green-500/50 text-green-600">
                  Ready
                </Badge>
              )}
            </div>
            <div className="relative">
              <Textarea
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                placeholder="Your AI-generated cover letter will appear here..."
                className="min-h-[500px] font-mono text-sm"
              />
              {!generatedLetter && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="text-center text-muted-foreground">
                    <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Fill in the form and click generate</p>
                    <p className="text-sm">to create your cover letter</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
