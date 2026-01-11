import Navbar from "@/components/Navbar";
import HeroFeatured from "@/components/HeroFeatured";
import SpotLight from "@/components/SpotLight";
import Featured from "@/components/Featured";
import Explore from "@/components/Explore";
import DiscoverMore from "@/components/DiscoverMore";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroFeatured />
      <SpotLight />
      <Featured />
      <Explore />
      <DiscoverMore />
      <Footer />
    </>
  );
}
