import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/c1ea9ad2-9de7-42e8-bac1-8ca15a98b123.png" 
            alt="Assina AI" 
            className="h-8 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#beneficios" className="text-foreground hover:text-primary transition-colors">
            Benefícios
          </a>
          <a href="#faq" className="text-foreground hover:text-primary transition-colors">
            FAQ
          </a>
          <a href="#contato" className="text-foreground hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        <a href="https://wa.me/5583991438932" target="_blank" rel="noopener noreferrer">
          <Button variant="outline-hero" size="sm">
            Quero contratar agora
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Header;
