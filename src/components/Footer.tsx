const Footer = () => {
  return (
    <footer id="contato" className="py-12 px-4 bg-background border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img 
              src="/lovable-uploads/c1ea9ad2-9de7-42e8-bac1-8ca15a98b123.png" 
              alt="Assina AI" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-muted-foreground">
              Especialistas em contratos com segurança jurídica garantida.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 contato@assinai.com.br</p>
              <p>📱 WhatsApp: (11) 99999-9999</p>
              <p>⏰ Seg-Sex: 8h às 18h</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Nossos Serviços</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Elaboração de contratos</li>
              <li>• Revisão jurídica</li>
              <li>• Consultoria especializada</li>
              <li>• Suporte pós-contrato</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Assina AI. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Protegendo seus acordos com excelência jurídica.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;