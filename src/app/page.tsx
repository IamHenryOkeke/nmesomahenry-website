import About from "@/components/about";
import Hero from "@/components/hero";
import HowIBuild from "@/components/how-i-build";
import Journey from "@/components/journey";
import Work from "@/components/works";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <HowIBuild />
      <Journey />
      <About />
    </main>
  );
}
