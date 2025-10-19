import Footer from "../../components/footer/Footer";
import SponsorCard from "../../components/ui/sponsorCard/SponsorCard";
import MarketeGit from "../../assets/images/rakeback-banner-coin.webp";
import TextAreaCard from "../../components/ui/TextAreaCard/TextAreaCard";
import Seviye from "../../components/ui/Seviye/Seviye";
import Oduller from "../../components/ui/Oduller/Oduller";

function Bonuslar() {
  return (
    <section className="mb-10 xl:mb-10 relative">
      {/* Yeni Tab Menüsü */}
      <div className="mt-8">
        <div className="flex gap-4 border-b border-gray-800 mb-6"></div>
        {/* Diğer İçerikler */}
        <SponsorCard
          background={MarketeGit}
          title={"Ne Kadar Aktifsen,O Kadar Ekocoin!"}
          description={
            "Ekrem Abi Telegram grubunda ne kadar aktifsen, o kadar kazanırsın. Her gece 23:59’a kadar ödülünü al!"
          }
          buttonText={"Hemen Katıl"}
          buttonLink={"#"}
        />
        <div data-v-9fdb989b="" className="flex gap-2 mb-6 mt-6 seviyeniz">
          <div>
            <h2 className="font-medium  text-gray-100 md:text-2xl">Seviyeniz</h2>
            <p className="text-sm font-light text-gray-300">
              Oyun oynayarak, giriş yaparak, etkinliklere katılarak kullanıcı
              seviyenizi ilerletin.
            </p>
          </div>
        </div>

        <Seviye />

        <div data-v-9fdb989b="" className="flex gap-2 mb-6 mt-6">
          <div>
            <h2 className="font-medium text-gray-100 md:text-2xl">
              Günlük Ödüller
            </h2>
            <p className="text-sm font-light text-gray-300">
              Her gün giriş yaparak size özel ödüller kazanın.
            </p>
          </div>
        </div>
        <Oduller />
        <TextAreaCard
          title={"Ödül Sistemimiz ile Tanışın!"}
          content={[
            "EkremAbi'nin en son yeniliği, seviye ve sadakat programı, oyununuzun her anını daha ödüllendirici hale getirmek için tasarlanmıştır.",
            "Seviye Sistemi",
            "Aşağıda, bilet etkinlikleri ile ilgili sıkça sorulan sorulara ve detaylara ulaşabilirsiniz:",
            "Bilet Çevrim Etkinliği: Her 1000 TL’lik çevrim için 1 bilet kazanırsınız.",
          ]}
          previewCount={2}
        />

        <Footer />
      </div>
    </section>
  );
}

export default Bonuslar;
