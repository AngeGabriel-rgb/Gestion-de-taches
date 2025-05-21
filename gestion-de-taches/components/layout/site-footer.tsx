import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} TaskMaster. Tous droits réservés.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
          >
            Conditions d&apos;utilisation
          </Link>
          <Link 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
          >
            Confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}