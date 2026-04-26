'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Sparkles, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code,
  FileText,
  Printer
} from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export default function ResumeBuilderClient() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  });

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([{
    id: '1',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  // Education
  const [education, setEducation] = useState<Education[]>([{
    id: '1',
    institution: '',
    degree: '',
    field: '',
    graduationDate: ''
  }]);

  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  // Projects
  const [projects, setProjects] = useState<Project[]>([]);

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: ''
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const generateSummary = async () => {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'resume-summary',
        data: {
          position: experiences[0]?.position || 'professional',
          company: experiences[0]?.company,
          skills: skills.slice(0, 5)
        }
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      setPersonalInfo({ ...personalInfo, summary: data.content });
    } else {
      // Fallback
      const summary = `Experienced ${experiences[0]?.position || 'professional'} with expertise in ${skills.slice(0, 3).join(', ') || 'software development'}. Proven track record of delivering high-quality solutions at ${experiences[0]?.company || 'leading companies'}. Passionate about continuous learning and driving impactful results.`;
      setPersonalInfo({ ...personalInfo, summary });
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const exportToPDF = async () => {
    // Create printable content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const resumeContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${personalInfo.name || 'Resume'} - Resume</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #2563eb; 
            padding-bottom: 15px; 
            margin-bottom: 20px;
          }
          .name { 
            font-size: 28px; 
            font-weight: 700; 
            color: #1a1a1a; 
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }
          .contact-info { 
            font-size: 12px; 
            color: #4b5563;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .section { 
            margin-bottom: 20px; 
          }
          .section-title { 
            font-size: 14px; 
            font-weight: 600; 
            color: #2563eb; 
            border-bottom: 1px solid #e5e7eb; 
            padding-bottom: 5px; 
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .experience-item, .education-item, .project-item { 
            margin-bottom: 15px; 
          }
          .experience-header, .education-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
          }
          .company, .institution { 
            font-weight: 600; 
            font-size: 14px;
            color: #1f2937;
          }
          .position, .degree { 
            font-size: 13px; 
            color: #4b5563;
            font-style: italic;
          }
          .date { 
            font-size: 11px; 
            color: #6b7280; 
          }
          .description { 
            font-size: 12px; 
            color: #374151;
            white-space: pre-line;
            margin-top: 6px;
          }
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill { 
            background: #f3f4f6; 
            padding: 4px 10px; 
            border-radius: 4px; 
            font-size: 11px;
            color: #374151;
          }
          .summary { 
            font-size: 12px; 
            color: #374151; 
          }
          .project-name { font-weight: 600; font-size: 13px; }
          .project-tech { font-size: 11px; color: #6b7280; margin-top: 4px; }
          @media print {
            body { padding: 0.5in; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${personalInfo.name || 'Your Name'}</div>
          <div class="contact-info">
            ${personalInfo.email ? `<span class="contact-item">📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span class="contact-item">📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.location ? `<span class="contact-item">📍 ${personalInfo.location}</span>` : ''}
            ${personalInfo.linkedin ? `<span class="contact-item">💼 ${personalInfo.linkedin}</span>` : ''}
            ${personalInfo.website ? `<span class="contact-item">🌐 ${personalInfo.website}</span>` : ''}
          </div>
        </div>

        ${personalInfo.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p class="summary">${personalInfo.summary}</p>
        </div>
        ` : ''}

        ${experiences.some(e => e.company || e.position) ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${experiences.filter(e => e.company || e.position).map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <div class="company">${exp.company}</div>
                  <div class="position">${exp.position}</div>
                </div>
                <div class="date">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
              </div>
              ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${education.some(e => e.institution || e.degree) ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${education.filter(e => e.institution || e.degree).map(edu => `
            <div class="education-item">
              <div class="education-header">
                <div>
                  <div class="institution">${edu.institution}</div>
                  <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
                </div>
                <div class="date">${formatDate(edu.graduationDate)}</div>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-container">
            ${skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${projects.some(p => p.name) ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${projects.filter(p => p.name).map(proj => `
            <div class="project-item">
              <div class="project-name">${proj.name}${proj.link ? ` - ${proj.link}` : ''}</div>
              ${proj.description ? `<div class="description">${proj.description}</div>` : ''}
              ${proj.technologies ? `<div class="project-tech">Technologies: ${proj.technologies}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </body>
      </html>
    `;

    printWindow.document.write(resumeContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Resume Builder
            </CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!personalInfo.name}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Resume Preview</DialogTitle>
                  </DialogHeader>
                  <div ref={resumeRef} className="bg-white text-black p-8 rounded-lg border shadow-sm">
                    {/* Preview Header */}
                    <div className="text-center border-b-2 border-blue-600 pb-4 mb-6">
                      <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name || 'Your Name'}</h1>
                      <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        {personalInfo.email && <span>📧 {personalInfo.email}</span>}
                        {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
                        {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                        {personalInfo.linkedin && <span>💼 {personalInfo.linkedin}</span>}
                        {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
                      </div>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                      <div className="mb-6">
                        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide border-b pb-1 mb-3">Professional Summary</h2>
                        <p className="text-sm text-gray-700">{personalInfo.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {experiences.some(e => e.company || e.position) && (
                      <div className="mb-6">
                        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide border-b pb-1 mb-3">Experience</h2>
                        {experiences.filter(e => e.company || e.position).map((exp, i) => (
                          <div key={i} className="mb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-800">{exp.company}</h3>
                                <p className="text-sm text-gray-600 italic">{exp.position}</p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                              </span>
                            </div>
                            {exp.description && (
                              <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Education */}
                    {education.some(e => e.institution || e.degree) && (
                      <div className="mb-6">
                        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide border-b pb-1 mb-3">Education</h2>
                        {education.filter(e => e.institution || e.degree).map((edu, i) => (
                          <div key={i} className="mb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                                <p className="text-sm text-gray-600 italic">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                              </div>
                              <span className="text-xs text-gray-500">{formatDate(edu.graduationDate)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide border-b pb-1 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {projects.some(p => p.name) && (
                      <div className="mb-6">
                        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide border-b pb-1 mb-3">Projects</h2>
                        {projects.filter(p => p.name).map((proj, i) => (
                          <div key={i} className="mb-3">
                            <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                            {proj.description && <p className="text-sm text-gray-700 mt-1">{proj.description}</p>}
                            {proj.technologies && (
                              <p className="text-xs text-gray-500 mt-1">Technologies: {proj.technologies}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                size="sm" 
                onClick={exportToPDF}
                disabled={!personalInfo.name}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-2 sm:px-4 overflow-x-auto">
              <TabsList className="h-auto sm:h-12 bg-transparent flex flex-nowrap min-w-max sm:min-w-0 sm:flex-wrap gap-1 py-2">
                <TabsTrigger value="personal" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-600 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-600 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-600 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-600 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-600 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Projects
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4 sm:p-6">
              <TabsContent value="personal" className="mt-0 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="San Francisco, CA"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="linkedin.com/in/johndoe"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/Portfolio</Label>
                    <Input
                      id="website"
                      placeholder="johndoe.com"
                      value={personalInfo.website}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={generateSummary}
                      className="text-violet-600 border-violet-500/30"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Generate
                    </Button>
                  </div>
                  <Textarea
                    id="summary"
                    placeholder="Write a compelling summary of your professional background and goals..."
                    rows={4}
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    A strong summary highlights your key achievements and career goals in 2-3 sentences.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-0 space-y-4 sm:space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      {experiences.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          placeholder="Google"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].company = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input
                          placeholder="Senior Software Engineer"
                          value={exp.position}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].position = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].startDate = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          placeholder="Present"
                          value={exp.endDate}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].endDate = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="• Led development of key features...
• Improved system performance by 40%...
• Mentored junior developers..."
                        rows={4}
                        value={exp.description}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].description = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Use bullet points (•) to highlight achievements. Start each bullet with action verbs.
                      </p>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addExperience}
                  className="w-full border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </TabsContent>

              <TabsContent value="education" className="mt-0 space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      {education.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          placeholder="Stanford University"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].institution = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                          placeholder="Bachelor of Science"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].degree = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Field of Study</Label>
                        <Input
                          placeholder="Computer Science"
                          value={edu.field}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].field = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Graduation Date</Label>
                        <Input
                          type="month"
                          value={edu.graduationDate}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].graduationDate = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addEducation}
                  className="w-full border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </TabsContent>

              <TabsContent value="skills" className="mt-0 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a skill and press Enter"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      className="min-h-[44px]"
                    />
                    <Button onClick={addSkill} variant="outline" className="shrink-0 min-h-[44px] min-w-[44px]">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="px-3 py-1.5 cursor-pointer hover:bg-red-500/10 hover:text-red-500 group"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No skills added yet. Add your technical and soft skills above.
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Suggested Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL', 'AWS', 'Docker', 'Git', 'Agile', 'Machine Learning', 'Data Analysis'].map((skill) => (
                        <Badge 
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-violet-500/10 hover:text-violet-600 hover:border-violet-500/30"
                          onClick={() => {
                            if (!skills.includes(skill)) {
                              setSkills([...skills, skill]);
                            }
                          }}
                        >
                          + {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-0 space-y-4 sm:space-y-6">
                {projects.map((project, index) => (
                  <div key={project.id} className="p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeProject(project.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input
                          placeholder="E-commerce Platform"
                          value={project.name}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index].name = e.target.value;
                            setProjects(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Link (optional)</Label>
                        <Input
                          placeholder="github.com/username/project"
                          value={project.link}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index].link = e.target.value;
                            setProjects(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Built a full-stack e-commerce platform..."
                          rows={3}
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index].description = e.target.value;
                            setProjects(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Technologies Used</Label>
                        <Input
                          placeholder="React, Node.js, MongoDB, AWS"
                          value={project.technologies}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index].technologies = e.target.value;
                            setProjects(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addProject}
                  className="w-full border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
                
                {projects.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Add your projects to showcase your work</p>
                    <p className="text-sm">Projects help demonstrate your practical skills</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
