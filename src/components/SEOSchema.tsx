import { useEffect } from "react";
import { FAQ_DATA } from "../types";

export default function SEOSchema() {
  useEffect(() => {
    // Generate LocalBusiness and HVAC specialist schemas
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "HVACBusiness",
      "name": "Prabhu Enterprises",
      "image": "https://ais-dev-nyvcnoggclztiaoconaaw2-58215884587.asia-southeast1.run.app/assets/logo.png",
      "@id": "https://ais-dev-nyvcnoggclztiaoconaaw2-58215884587.asia-southeast1.run.app/#business",
      "url": "https://ais-dev-nyvcnoggclztiaoconaaw2-58215884587.asia-southeast1.run.app",
      "telephone": "+919892256851",
      "email": "prabhuenterprises@gmx.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit No.1, Bhagwansing Colony, Nr. Bldg. 6, Besides Post Office, SB Road, Mahim (W)",
        "addressLocality": "Mumbai",
        "postalCode": "400016",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.0330,
        "longitude": 72.8400
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    // FAQ schema injection
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    // Inject scripts
    const scriptBusiness = document.createElement("script");
    scriptBusiness.type = "application/ld+json";
    scriptBusiness.innerText = JSON.stringify(businessSchema);
    document.head.appendChild(scriptBusiness);

    const scriptFaq = document.createElement("script");
    scriptFaq.type = "application/ld+json";
    scriptFaq.innerText = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFaq);

    // Cleanups on unmount
    return () => {
      document.head.removeChild(scriptBusiness);
      document.head.removeChild(scriptFaq);
    };
  }, []);

  return null;
}
