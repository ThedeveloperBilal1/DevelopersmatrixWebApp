import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data, Your Rights",
  description: "Learn how DevelopersMatrix collects, uses, and protects your personal information. Our privacy-first approach to your data.",
  openGraph: {
    title: "Privacy Policy | DevelopersMatrix",
    description: "Learn how we protect your personal information.",
    url: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Privacy Policy", url: `${siteConfig.url}/privacy` }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: January 2024
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment to Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At DevelopersMatrix, we take your privacy seriously. Our platform is built with a 
                privacy-first approach, meaning we minimize data collection and maximize your control 
                over your personal information. This policy outlines what data we collect, how we use 
                it, and your rights regarding your information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Data You Provide</h4>
                <p className="text-sm text-muted-foreground">
                  When you use our tools (like the Resume Builder or Budget Planner), the data you enter 
                  is stored locally in your browser. We do not transmit or store this data on our servers 
                  unless you explicitly choose to save it to your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Automatically Collected Data</h4>
                <p className="text-sm text-muted-foreground">
                  We collect basic usage analytics to improve our service, including pages visited, 
                  features used, and general performance metrics. This data is anonymized and aggregated.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  We use essential cookies for site functionality and optional cookies for analytics. 
                  You can disable non-essential cookies in your browser settings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  'Provide and improve our services',
                  'Respond to your inquiries and support requests',
                  'Send relevant updates and newsletters (with your consent)',
                  'Analyze usage patterns to enhance user experience',
                  'Protect against fraud and abuse'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-violet-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We implement industry-standard security measures to protect your data. All data 
                transmission is encrypted using HTTPS, and we regularly audit our systems for 
                vulnerabilities. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2">
                {[
                  'Access the personal data we hold about you',
                  'Request correction of inaccurate data',
                  'Request deletion of your data',
                  'Opt-out of marketing communications',
                  'Export your data in a portable format'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-violet-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We may use third-party services for analytics and advertising. These services have 
                their own privacy policies, and we encourage you to review them. We do not sell your 
                personal information to third parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at:
                <br /><br />
                <a href="mailto:privacy@developersmatrix.com" className="text-violet-600 hover:underline">
                  privacy@developersmatrix.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
