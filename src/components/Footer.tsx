const Footer = () => {
  return (
    <footer className="bg-surface-container py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl text-inverse-surface mb-3">
              Artisanat<span className="text-primary font-light italic"> San Pedro</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Plateforme digitale du programme PACTE pour la promotion de l'artisanat à San Pedro, Côte d'Ivoire.
            </p>
          </div>
          <div>
            <span className="label-caps text-muted-foreground mb-4 block">Navigation</span>
            <ul className="space-y-2">
              {["Galerie", "Artisans", "Collections", "À propos"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-inverse-surface hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label-caps text-muted-foreground mb-4 block">Contact</span>
            <ul className="space-y-2 text-sm text-inverse-surface">
              <li>San Pedro, Côte d'Ivoire</li>
              <li>info@artisanat-sanpedro.ci</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © 2026 Artisanat San Pedro — Programme PACTE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
