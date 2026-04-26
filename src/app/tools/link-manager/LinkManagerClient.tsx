'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link2, 
  Plus, 
  Trash2, 
  Copy, 
  Check,
  QrCode,
  BarChart3,
  ExternalLink,
  Calendar,
  Globe,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Github,
  MapPin,
  Clock,
  Eye,
  MousePointer,
  Share2,
  Settings,
  Palette
} from 'lucide-react';

interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  title: string;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
  qrCode: string;
}

interface BioLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
}

interface BioPage {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  theme: 'light' | 'dark' | 'gradient';
  links: BioLink[];
  socialLinks: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  autoUpdate: {
    youtube: boolean;
    instagram: boolean;
  };
}

export default function LinkManagerClient() {
  const [activeTab, setActiveTab] = useState('links');
  const [copied, setCopied] = useState<string | null>(null);
  
  // Short Links State
  const [links, setLinks] = useState<ShortLink[]>([
    {
      id: '1',
      originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
      shortCode: 'abc123',
      title: 'My Portfolio',
      clicks: 1234,
      createdAt: '2024-01-15',
      qrCode: 'qr-abc123'
    },
    {
      id: '2', 
      originalUrl: 'https://youtube.com/watch?v=example',
      shortCode: 'yt123',
      title: 'Latest Video',
      clicks: 567,
      createdAt: '2024-01-20',
      qrCode: 'qr-yt123'
    }
  ]);
  
  const [newLink, setNewLink] = useState({ url: '', title: '', expiresIn: '' });
  const [showQrModal, setShowQrModal] = useState<string | null>(null);
  
  // Bio Page State
  const [bioPage, setBioPage] = useState<BioPage>({
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Developer | Creator | Tech Enthusiast',
    avatar: '',
    theme: 'gradient',
    links: [
      { id: '1', title: 'My Portfolio', url: 'https://johndoe.dev', icon: 'globe', clicks: 456 },
      { id: '2', title: 'Latest Project', url: 'https://github.com/johndoe/project', icon: 'github', clicks: 234 },
    ],
    socialLinks: {
      instagram: 'johndoe',
      youtube: 'JohnDoeChannel',
      twitter: 'johndoe',
      github: 'johndoe'
    },
    autoUpdate: {
      youtube: true,
      instagram: false
    }
  });

  const createShortLink = () => {
    if (!newLink.url) return;
    
    const shortCode = Math.random().toString(36).substring(2, 8);
    const link: ShortLink = {
      id: Date.now().toString(),
      originalUrl: newLink.url,
      shortCode,
      title: newLink.title || 'Untitled',
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: newLink.expiresIn || undefined,
      qrCode: `qr-${shortCode}`
    };
    
    setLinks([link, ...links]);
    setNewLink({ url: '', title: '', expiresIn: '' });
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const addBioLink = () => {
    const newBioLink: BioLink = {
      id: Date.now().toString(),
      title: 'New Link',
      url: 'https://',
      icon: 'link',
      clicks: 0
    };
    setBioPage({ ...bioPage, links: [...bioPage.links, newBioLink] });
  };

  const updateBioLink = (id: string, field: keyof BioLink, value: string | number) => {
    setBioPage({
      ...bioPage,
      links: bioPage.links.map(l => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  const deleteBioLink = (id: string) => {
    setBioPage({ ...bioPage, links: bioPage.links.filter(l => l.id !== id) });
  };

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full mb-6">
            <Link2 className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Link Management Platform</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Link Manager & <span className="gradient-text">Smart Bio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create branded short links with analytics, generate QR codes, and build 
            a smart bio page that auto-updates with your latest content.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Link2 className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
              <p className="text-2xl font-bold">{links.length}</p>
              <p className="text-sm text-muted-foreground">Active Links</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MousePointer className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <QrCode className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{links.length}</p>
              <p className="text-sm text-muted-foreground">QR Codes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Bio Page</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="links" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Short Links
            </TabsTrigger>
            <TabsTrigger value="bio" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Bio Page
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Short Links Tab */}
          <TabsContent value="links">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Create New Link */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Short Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Destination URL</Label>
                    <Input
                      placeholder="https://example.com/your-long-url"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title (optional)</Label>
                    <Input
                      placeholder="My awesome link"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiration Date (optional)</Label>
                    <Input
                      type="date"
                      value={newLink.expiresIn}
                      onChange={(e) => setNewLink({ ...newLink, expiresIn: e.target.value })}
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    onClick={createShortLink}
                    disabled={!newLink.url}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Create Short Link
                  </Button>
                </CardContent>
              </Card>

              {/* Links List */}
              <div className="lg:col-span-2 space-y-4">
                {links.map(link => (
                  <Card key={link.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{link.title}</h3>
                            <Badge variant="secondary">{link.clicks} clicks</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-indigo-500 font-medium">
                              dmatrix.link/{link.shortCode}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(`dmatrix.link/${link.shortCode}`, link.id)}
                            >
                              {copied === link.id ? (
                                <Check className="w-3 h-3 text-green-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {link.originalUrl}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {link.createdAt}
                            </span>
                            {link.expiresAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Expires: {link.expiresAt}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowQrModal(link.id)}
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:bg-red-500/10"
                            onClick={() => deleteLink(link.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Bio Page Tab */}
          <TabsContent value="bio">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bio Editor */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Edit Bio Page
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <div className="flex items-center">
                        <span className="text-muted-foreground text-sm mr-1">dmatrix.bio/</span>
                        <Input
                          value={bioPage.username}
                          onChange={(e) => setBioPage({ ...bioPage, username: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input
                        value={bioPage.displayName}
                        onChange={(e) => setBioPage({ ...bioPage, displayName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Input
                      value={bioPage.bio}
                      onChange={(e) => setBioPage({ ...bioPage, bio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex gap-2">
                      {['light', 'dark', 'gradient'].map(theme => (
                        <Button
                          key={theme}
                          variant={bioPage.theme === theme ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setBioPage({ ...bioPage, theme: theme as 'light' | 'dark' | 'gradient' })}
                          className={bioPage.theme === theme ? 'bg-indigo-500' : 'capitalize'}
                        >
                          <Palette className="w-4 h-4 mr-2" />
                          {theme}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-2">
                    <Label>Social Links</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'instagram', icon: Instagram, placeholder: 'username' },
                        { key: 'youtube', icon: Youtube, placeholder: 'channel' },
                        { key: 'twitter', icon: Twitter, placeholder: 'username' },
                        { key: 'linkedin', icon: Linkedin, placeholder: 'username' },
                        { key: 'github', icon: Github, placeholder: 'username' },
                      ].map(social => (
                        <div key={social.key} className="flex items-center gap-2">
                          <social.icon className="w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder={social.placeholder}
                            value={bioPage.socialLinks[social.key as keyof typeof bioPage.socialLinks] || ''}
                            onChange={(e) => setBioPage({
                              ...bioPage,
                              socialLinks: { ...bioPage.socialLinks, [social.key]: e.target.value }
                            })}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Auto Update Settings */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Auto-Update Latest Content
                    </Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioPage.autoUpdate.youtube}
                          onChange={(e) => setBioPage({
                            ...bioPage,
                            autoUpdate: { ...bioPage.autoUpdate, youtube: e.target.checked }
                          })}
                          className="rounded"
                        />
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span className="text-sm">YouTube</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioPage.autoUpdate.instagram}
                          onChange={(e) => setBioPage({
                            ...bioPage,
                            autoUpdate: { ...bioPage.autoUpdate, instagram: e.target.checked }
                          })}
                          className="rounded"
                        />
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <span className="text-sm">Instagram</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio Links */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Bio Links</CardTitle>
                    <Button size="sm" onClick={addBioLink}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bioPage.links.map(link => (
                    <div key={link.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={link.title}
                          onChange={(e) => updateBioLink(link.id, 'title', e.target.value)}
                          placeholder="Link title"
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => deleteBioLink(link.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        value={link.url}
                        onChange={(e) => updateBioLink(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="text-sm"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{link.clicks} clicks</span>
                      </div>
                    </div>
                  ))}
                  
                  {bioPage.links.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Link2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p>Add links to your bio page</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Bio Preview */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Bio Page Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`max-w-sm mx-auto p-8 rounded-2xl ${
                  bioPage.theme === 'dark' ? 'bg-gray-900 text-white' :
                  bioPage.theme === 'gradient' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' :
                  'bg-white text-gray-900 border'
                }`}>
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${
                      bioPage.theme === 'light' ? 'bg-gray-100' : 'bg-white/20'
                    }`}>
                      {bioPage.displayName.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold">@{bioPage.username}</h3>
                    <p className={`text-sm mt-1 ${bioPage.theme === 'light' ? 'text-gray-600' : 'text-white/80'}`}>
                      {bioPage.bio}
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3 mb-6">
                    {bioPage.socialLinks.instagram && <Instagram className="w-5 h-5" />}
                    {bioPage.socialLinks.youtube && <Youtube className="w-5 h-5" />}
                    {bioPage.socialLinks.twitter && <Twitter className="w-5 h-5" />}
                    {bioPage.socialLinks.github && <Github className="w-5 h-5" />}
                  </div>

                  {/* Links */}
                  <div className="space-y-3">
                    {bioPage.links.map(link => (
                      <a
                        key={link.id}
                        href={link.url}
                        className={`block p-3 rounded-lg text-center text-sm font-medium transition-transform hover:scale-105 ${
                          bioPage.theme === 'light' 
                            ? 'bg-gray-100 hover:bg-gray-200' 
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                    <div className="text-green-500 text-sm flex items-center gap-1">
                      <MousePointer className="w-4 h-4" />
                      +12%
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold">1,456</p>
                    </div>
                    <div className="text-green-500 text-sm flex items-center gap-1">
                      <MousePointer className="w-4 h-4" />
                      +8%
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold">5,678</p>
                    </div>
                    <div className="text-green-500 text-sm flex items-center gap-1">
                      <MousePointer className="w-4 h-4" />
                      +15%
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">CTR</p>
                      <p className="text-2xl font-bold">3.2%</p>
                    </div>
                    <div className="text-blue-500 text-sm">Avg</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {links.sort((a, b) => b.clicks - a.clicks).map((link, i) => (
                    <div key={link.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
                        <div>
                          <p className="font-medium">{link.title}</p>
                          <p className="text-sm text-muted-foreground">dmatrix.link/{link.shortCode}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{link.clicks.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">clicks</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
