import HeroSection from "./(nondashboard)/landing/HeroSection";
import FeaturesSection from "./(nondashboard)/landing/FeaturesSection";
import DiscoverSection from "./(nondashboard)/landing/DiscoverSection";
import CTASection from "./(nondashboard)/landing/CTASection";
import { PropertyCard } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-off-white font-sans">
      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      
      {/* Properties Preview */}
      <section className="py-20 bg-blue-pale/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">Dernières Annonces</h2>
              <p className="text-gray-600">Découvrez les biens les plus récents sur le marché.</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-blue-electric text-blue-electric hover:bg-blue-pale">Voir tout</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <PropertyCard 
                key={item}
                variant={item === 2 ? "elite" : "standard"}
                title="Villa Moderne F4"
                location="Hydra, Alger"
                price="85,000"
                badge={item === 2 ? "ELITE" : "STARTER"}
                badgeVariant={item === 2 ? "premium" : "default"}
                rooms={4}
                surface={150}
                bathrooms={2}
                image="/placeholder.jpg"
              />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" className="w-full border-blue-electric text-blue-electric hover:bg-blue-pale">Voir tout</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}