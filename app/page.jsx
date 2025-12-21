import Navbar from "@/components/Navbar";
import HeroFeatured from "@/components/HeroFeatured";
import MainLayout from "@/components/MainLayout";
import CategoryBlock from "@/components/CategoryBlock";
import { FollowUs } from "@/components/FollowUs";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Home() {
  const musicPosts = [
    {
      title:
        "Studying listening to music can help you memorize information more easily",
      image: "/images/music-1.jpg",
      date: "March 05, 2020",
    },
    {
      title: "Affordable electronics for your home studio setup",
      image: "/images/music-2.jpg",
      date: "March 04, 2020",
    },
    {
      title: "See the top playlist on Spotify this month",
      image: "/images/music-3.jpg",
      date: "March 03, 2020",
    },
    {
      title: "Keep your health intact while working with headphones",
      image: "/images/music-4.jpg",
      date: "March 02, 2020",
    },
  ];

  const techPosts = [
    {
      title: "How a good team can positively influence your business",
      image: "/images/tech-1.jpg",
      date: "March 05, 2020",
    },
    {
      title: "Drones an indispensable tool for professionals",
      image: "/images/tech-2.jpg",
      date: "March 04, 2020",
    },
    {
      title: "Top reasons why Microsoft discontinued Windows Phone",
      image: "/images/tech-3.jpg",
      date: "March 03, 2020",
    },
    {
      title: "Smartphone battery tips to improve performance",
      image: "/images/tech-4.jpg",
      date: "March 02, 2020",
    },
  ];

  const bitcoinPosts = [
    {
      title: "See some alternatives to Bitcoin that can be a good investment",
      image: "/images/crypto-1.jpg",
      date: "March 05, 2020",
    },
    {
      title: "Know the right time to acquire Bitcoins",
      image: "/images/crypto-2.jpg",
      date: "March 04, 2020",
    },
    {
      title: "Saving Bitcoins can be a good investment for the future",
      image: "/images/crypto-3.jpg",
      date: "March 03, 2020",
    },
    {
      title: "Economics experts give their views on crypto coins",
      image: "/images/crypto-4.jpg",
      date: "March 02, 2020",
    },
  ];

  return (
    <>
      <Navbar />
      <HeroFeatured />

      <MainLayout
        left={
          <>
            <CategoryBlock title="Music" posts={musicPosts} />
            <CategoryBlock title="Technology" posts={techPosts} />
            <CategoryBlock title="Bitcoin" posts={bitcoinPosts} />
          </>
        }
        right={<Sidebar />}
      />
      <Footer />
    </>
  );
}
