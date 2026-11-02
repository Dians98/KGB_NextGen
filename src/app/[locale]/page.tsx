import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";

export default function HomePage() {
  return (
    <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <Services />
      <Projects />
      <Team />
      <Contact />
    </main>
  );
}
