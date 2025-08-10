import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-contract.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-gray-light px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <img 
            src={heroImage} 
            alt="Contratos digitais seguros" 
            className="w-full max-w-2xl mx-auto rounded-2xl shadow-[var(--shadow-card)]"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Seus contratos com{" "}
          <span className="text-primary">segurança jurídica</span>{" "}
          garantida
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Especialistas na elaboração, revisão e gestão de contratos. 
          Clareza nas negociações, proteção nos seus acordos.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a href="https://wa.me/5583991438932" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Quero contratar agora
            </Button>
          </a>
          <div className="text-lg text-muted-foreground">
            <span className="font-semibold text-primary">R$ 30</span> por contrato
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          ✓ Entrega em PDF  ✓ Pronto em até 2 dias  ✓ Revisão incluída
        </p>
      </div>
    </section>
  );
};

export default Hero;
