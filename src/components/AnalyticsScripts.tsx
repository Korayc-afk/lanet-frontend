export default function AnalyticsScripts({
  googleAnalyticsId,
}: {
  googleAnalyticsId?: string | null; // ✅ null da izin ver
}) {
  if (!googleAnalyticsId) return null; // null ise hiçbir şey render etme
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `,
        }}
      />
    </>
  );
}
