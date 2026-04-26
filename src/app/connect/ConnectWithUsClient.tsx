'use client';

import { useState } from 'react';
import { 
  Megaphone, 
  Package, 
  Wrench, 
  PenTool, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  Send,
  Sparkles,
  TrendingUp,
  Target,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const services = [
  {
    icon: Megaphone,
    title: "Advertise With Us",
    description: "Reach thousands of developers, entrepreneurs, and tech professionals through banner ads, sponsored content, and newsletter placements.",
    features: ["Banner Advertising", "Sponsored Articles", "Newsletter Sponsorship", "Homepage Featured Placement"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Package,
    title: "Promote Your Product",
    description: "Launch and promote your tech product, SaaS, or developer tool to our engaged audience of tech enthusiasts.",
    features: ["Product Reviews", "Launch Features", "Demo Showcases", "User Testimonials"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Wrench,
    title: "AI Tool Promotion",
    description: "Showcase your AI tool or platform to developers actively looking for AI solutions and integrations.",
    features: ["Tool Directory Listing", "Detailed Reviews", "Comparison Features", "Tutorial Integration"],
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: PenTool,
    title: "Guest Posting",
    description: "Share your expertise with our community through high-quality guest posts and thought leadership articles.",
    features: ["Expert Authorship", "SEO Benefits", "Audience Reach", "Authority Building"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Partnership Programs",
    description: "Build long-term strategic partnerships for content collaboration, events, and mutual growth.",
    features: ["Content Partnerships", "Event Collaborations", "Affiliate Programs", "Co-marketing"],
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Target,
    title: "Custom Campaigns",
    description: "Design custom marketing campaigns tailored to your specific goals and target audience.",
    features: ["Tailored Strategy", "Performance Tracking", "ROI Optimization", "Audience Targeting"],
    color: "from-red-500 to-rose-500"
  }
];

const stats = [
  { value: "10K+", label: "Monthly Visitors" },
  { value: "5K+", label: "Newsletter Subscribers" },
  { value: "8+", label: "AI Tools Featured" },
  { value: "26+", label: "Blog Articles" }
];

export default function ConnectWithUsClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 px-4 py-2 border-violet-500/30 bg-violet-500/10">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-violet-500" />
            <span className="text-violet-600 dark:text-violet-400">Partnership Opportunities</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Connect <span className="gradient-text">With Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Partner with DevelopersMatrix to reach thousands of developers, entrepreneurs, 
            and tech professionals. Let&apos;s grow together!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Can Work Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that best fits your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-violet-500/30">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Ready to start a partnership? Fill out the form and we&apos;ll get back to you 
                within 24-48 hours with a customized proposal.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">sy.bilalshah@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-muted-foreground">Within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Global Reach</h3>
                    <p className="text-muted-foreground">Worldwide audience</p>
                  </div>
                </div>
              </div>

              {/* Why Partner With Us */}
              <Card className="mt-8 bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Why Partner With Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">Targeted developer & tech audience</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">SEO-optimized content placement</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">Competitive pricing packages</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">Detailed performance analytics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">Dedicated account management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Tell us about your project and we&apos;ll create a custom proposal for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground mb-4">
                      We&apos;ll get back to you within 24-48 hours.
                    </p>
                    <Button onClick={() => setSubmitStatus('idle')} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company / Organization</Label>
                      <Input
                        id="company"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="advertising">Advertising</SelectItem>
                            <SelectItem value="product-promotion">Product Promotion</SelectItem>
                            <SelectItem value="ai-tool-promotion">AI Tool Promotion</SelectItem>
                            <SelectItem value="guest-post">Guest Posting</SelectItem>
                            <SelectItem value="partnership">Partnership Program</SelectItem>
                            <SelectItem value="custom">Custom Campaign</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-500">Under $500</SelectItem>
                            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                            <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                            <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="5000-plus">$5,000+</SelectItem>
                            <SelectItem value="discuss">Let&apos;s Discuss</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
