import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { DollarSign, TrendingUp, Users, Link as LinkIcon, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Program - Earn with Developers Matrix',
  description: 'Join our affiliate program and earn passive income by recommending AI tools and developer resources.',
};

export default function AffiliatePage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Generous Commissions',
      description: 'Earn 20-30% commission on affiliate sales through our platform',
    },
    {
      icon: TrendingUp,
      title: 'Passive Income',
      description: 'Earn ongoing revenue from your referrals without ongoing effort',
    },
    {
      icon: Users,
      title: 'Large Audience',
      description: 'Reach thousands of developers through our platform',
    },
    {
      icon: LinkIcon,
      title: 'Easy Integration',
      description: 'Simple links and badges to promote products and services',
    },
  ];

  const requirements = [
    'Maintain your own platform (blog, YouTube, social media, etc.)',
    'Only promote products relevant to your audience',
    'Follow our content guidelines and policies',
    'Minimum monthly traffic requirement (varies by program)',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center py-6">
        <h1 className="text-4xl font-bold">Affiliate Program</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Earn passive income by recommending AI tools and developer resources to your audience.
        </p>
      </div>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Why Join Our Program?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex gap-4">
                  <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: 'Join the Program',
              description: 'Apply to our affiliate program and get approved',
            },
            {
              step: 2,
              title: 'Get Your Links',
              description: 'Receive unique referral links and marketing materials',
            },
            {
              step: 3,
              title: 'Promote',
              description: 'Share links with your audience through your platform',
            },
            {
              step: 4,
              title: 'Earn Commissions',
              description: 'Get paid when users purchase through your links',
            },
          ].map((item) => (
            <Card key={item.step} className="p-6 flex gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Commission Structure */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Commission Structure</h2>
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: 'Standard', commission: '20%', requirement: '0+ referrals' },
              { tier: 'Silver', commission: '25%', requirement: '50+ monthly' },
              { tier: 'Gold', commission: '30%', requirement: '200+ monthly' },
            ].map((tier) => (
              <Card key={tier.tier} className="p-4 bg-muted/50 text-center">
                <h4 className="font-semibold mb-2">{tier.tier}</h4>
                <div className="text-3xl font-bold text-primary mb-2">
                  {tier.commission}
                </div>
                <p className="text-xs text-muted-foreground">{tier.requirement}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Requirements */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Requirements</h2>
        <Card className="p-6">
          <ul className="space-y-3">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* CTA */}
      <section className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Join our affiliate program today and start earning passive income by recommending the best tools to your audience.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Apply Now
        </Button>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'How often do I get paid?',
              a: 'Commissions are calculated monthly and paid via PayPal, bank transfer, or your preferred payment method.',
            },
            {
              q: 'What is the cookie duration?',
              a: 'Cookies last for 30 days, giving you plenty of time for conversions after your referral.',
            },
            {
              q: 'Can I promote on paid channels?',
              a: 'Yes, you can use paid ads (Google Ads, Facebook, etc.) as long as you follow our content policies.',
            },
            {
              q: 'Is there a minimum payout?',
              a: 'Yes, you must earn at least $50 before requesting a payout.',
            },
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
