import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Mail, Shield, Users, Zap } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Contratos sob medida",
      description: "Cada contrato é elaborado especificamente para sua necessidade, sem modelos genéricos."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Revisão minuciosa",
      description: "Identificamos e eliminamos cláusulas prejudiciais antes que você assine qualquer coisa."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Segurança jurídica",
      description: "Garantimos que seus contratos estejam de acordo com a legislação vigente."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Economia de tempo",
      description: "Serviços rápidos e organizados. A maioria dos contratos fica pronta em até 2 dias."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Suporte especializado",
      description: "Nossa equipe está sempre disponível para esclarecer suas dúvidas sobre os contratos."
    },
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: "Entrega 100% Online",
      description: "Receba seus contratos direto no seu e-mail em formato PDF, sem burocracia."
    }
  ];

  return (
    <section id="beneficios" className="py-20 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Por que escolher a <span className="text-primary">Assina AI</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Não é só mais um contrato. É a proteção que seu negócio merece.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;