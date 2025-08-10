import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Garanta a segurança dos seus contratos agora
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Não deixe seu negócio vulnerável. Cada dia sem um contrato bem feito é um risco que você está correndo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button variant="secondary" size="xl" className="w-full sm:w-auto bg-background text-primary hover:bg-gray-light">
            Quero contratar agora
          </Button>
          <div className="text-lg opacity-90">
            <span className="font-semibold">R$ 30</span> • Entrega em PDF • Até 3 dias
          </div>
        </div>
        
        <p className="text-sm opacity-75">
          ✓ Sem taxa de adesão   ✓ Sem mensalidade   ✓ Pague apenas pelos contratos que usar
        </p>
      </div>
    </section>
  );
};

export default CTA;
