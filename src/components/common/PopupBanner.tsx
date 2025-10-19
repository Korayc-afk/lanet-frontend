import { useLocation } from "react-router";

export default function PopupBanner({ text }: { text: string }) {
  const location = useLocation();

  // /admin sayfalarında gösterme, text boşsa gösterme
  if (location.pathname.startsWith("/admin") || !text) return null;

  return (
    <div className="overflow-hidden bg-green-500 text-black  font-semibold whitespace-nowrap">
      <div
        className="inline-block"
        style={{
          paddingLeft: "100%",
          animation: "marquee 30s linear infinite",
        }}
      >
        {text}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; {text}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
