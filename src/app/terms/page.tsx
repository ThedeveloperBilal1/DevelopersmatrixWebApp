import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Terms of Service - Usage Agreement",
  description: "Read the terms and conditions for using DevelopersMatrix services and tools.",
  openGraph: {
    title: "Terms of Service | DevelopersMatrix",
    description: "Terms and conditions for using our services.",
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Terms of Service", url: `${siteConfig.url}/terms` }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: January 2024
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By accessing and using DevelopersMatrix ("the Service"), you accept and agree to be 
                bound by the terms and provisions of this agreement. If you do not agree to abide by 
                these terms, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                DevelopersMatrix provides AI-powered tools and resources for career development, 
                productivity optimization, and professional growth. Our services include but are not 
                limited to resume building, budget planning, trend analysis, and community discussions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">You agree to:</p>
              <ul className="space-y-2">
                {[
                  'Use the service only for lawful purposes',
                  'Not attempt to circumvent security measures',
                  'Not upload malicious content or code',
                  'Respect intellectual property rights',
                  'Not engage in harassment or harmful behavior',
                  'Provide accurate information when required'
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
              <CardTitle>4. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The content, features, and functionality of DevelopersMatrix are owned by us or our 
                licensors and are protected by copyright, trademark, and other intellectual property 
                laws. You may not reproduce, distribute, or create derivative works without permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. User-Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By posting content on our platform (such as questions or comments), you grant us a 
                non-exclusive, royalty-free license to use, display, and distribute that content on 
                our platform. You retain ownership of your content and are responsible for ensuring 
                it does not violate any laws or third-party rights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The service is provided "as is" without warranties of any kind, either express or 
                implied. We do not guarantee the accuracy, completeness, or usefulness of any content 
                or tools. AI-generated content should be reviewed before use.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                DevelopersMatrix shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from your use of the service. Our total liability 
                shall not exceed the amount you paid us in the past 12 months.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Continued use of the service after changes constitutes 
                acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We may terminate or suspend your access to the service at any time, without prior 
                notice, for conduct that we believe violates these terms or is harmful to other 
                users, us, or third parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
                <br /><br />
                <a href="mailto:legal@developersmatrix.com" className="text-violet-600 hover:underline">
                  legal@developersmatrix.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
