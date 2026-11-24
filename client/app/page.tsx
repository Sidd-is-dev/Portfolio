import HeroSection from "@/components/Herosection";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Project";
import Education from "@/components/Education";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Midnight Studio ambient radial accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
        <div className="absolute top-[38%] -right-40 h-[320px] w-[320px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Sticky Glass Navigation */}
      <Navbar />

      <main id="top">
        {/* Hero Section */}
        <HeroSection />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Technical Skills Section */}
        <Skills />

        {/* Education Section */}
        <Education />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />

      <ChatWidget />
    </div>
  );
}
