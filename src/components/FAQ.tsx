import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Vocês atendem apenas empresas ou também pessoas físicas?",
      answer: "Atendemos ambos! Seja você um empreendedor ou um particular, criamos e revisamos contratos de forma personalizada para suas necessidades específicas."
    },
    {
      question: "Quanto tempo leva para elaborar um contrato?",
      answer: "Depende da complexidade, mas a maioria dos contratos é entregue em até 40 minutos a 2 dias úteis. Contratos mais simples podem ficar prontos no mesmo dia!"
    },
    {
      question: "É possível revisar um contrato que já tenho pronto?",
      answer: "Claro! Fazemos revisão detalhada para identificar riscos e sugerir melhorias antes da assinatura. É uma das nossas especialidades."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gray-light">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Dúvidas frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            As perguntas que todo mundo faz (e que você provavelmente também tem)
          </p>
        </div>
        
        <div className="bg-background rounded-2xl shadow-[var(--shadow-card)] p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;