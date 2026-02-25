import Script from "next/script";

export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Developers Matrix",
    url: "https://developersmatrix-web-app.vercel.app",
    description: "Your daily source for tech news, AI updates, and developer tools",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://developersmatrix-web-app.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Developers Matrix",
    url: "https://developersmatrix-web-app.vercel.app",
    logo: "https://developersmatrix-web-app.vercel.app/logo.png",
    sameAs: [
      "https://twitter.com/developersmatrix",
      "https://github.com/developersmatrix",
    ],
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
