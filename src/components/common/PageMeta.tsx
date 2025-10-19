import { HelmetProvider, Helmet } from "react-helmet-async";
import React from 'react'; // React importu eklendi

// PageMeta bileşeninin prop tanımlamasını güncelliyoruz
const PageMeta = ({
  title,
  description,
}: {
  title?: string | null; // title artık null veya undefined olabilir
  description?: string | null; // description artık null veya undefined olabilir
}) => (
  <Helmet>
    {/* Eğer title prop'u null/undefined ise bir varsayılan başlık kullan */}
    <title>{title || "Sitenizin Varsayılan Başlığı"}</title>
    {/* Eğer description prop'u null/undefined ise bir varsayılan açıklama kullan */}
    <meta name="description" content={description || "Sitenizin varsayılan SEO açıklaması."} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;