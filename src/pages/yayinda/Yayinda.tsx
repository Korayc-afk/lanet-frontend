import { useEffect, useState } from "react";
import axios from "axios";

import SectionHeaderCard from "../../components/ui/menuBasliklar/YayindaTitle";
import SponsorCard from "../../components/ui/sponsorCard/SponsorCard";
import SanaOzelCard from "../../components/ui/SanaOzel/SanaOzel";
import SosyalMedya from "../../components/ui/sosyal/SosyalMedya";
import VideoCard from "../../components/ui/EnCokIzlenenler/VideoCard";
import Footer from "../../components/footer/Footer";

const BASE_URL = "/api-uploads";

interface Sponsor {
  id: number;
  logoUrl: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isMain: boolean;
}

const Yayinda = () => {
  const [mainSponsor, setMainSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/sponsors`);
        const sponsors: Sponsor[] = res.data.data;
        const main = sponsors.find((s) => s.isMain);
        setMainSponsor(main || null);
      } catch (err) {
        console.error("Ana sponsor alınamadı:", err);
      }
    };

    fetchSponsor();
  }, []);

  return (
    <section className="mb-10 xl:mb-10 relative">
      <SectionHeaderCard
        title="Yayında Oynanan Siteler"
        description="Yayında oynadığımız casino sitelerini keşfedin"
      />

      {/* Sponsor Card - Dinamik */}
      {mainSponsor && (
        <SponsorCard
          logo={`${BASE_URL}${mainSponsor.logoUrl}`}
          background={`${BASE_URL}${mainSponsor.imageUrl}`}
          title={mainSponsor.title}
          description={mainSponsor.description}
          buttonText={mainSponsor.buttonText}
          buttonLink={mainSponsor.buttonUrl}
          sponsorTag="Ana Sponsor"
          rightImage={`${BASE_URL}${mainSponsor.logoUrl}`} // ✅ EKLENDİ
          className="md:py-35"
        />
      )}

      {/* Diğer içerikler */}
      <div className="mt-8">
        <SanaOzelCard />
        <SosyalMedya />
        <VideoCard />
        <Footer />
      </div>
    </section>
  );
};

export default Yayinda;
