"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const solutions = [
  {
    title: "Lead Qualifier",
    href: "/solutions/lead-qualifier",
    description: "AI-powered lead qualification and scoring",
  },
  {
    title: "Workflow Automation",
    href: "/solutions/workflow-automation",
    description: "Streamline your business processes",
  },
  {
    title: "Email Assistant",
    href: "/solutions/email-assistant",
    description: "Intelligent email management and responses",
  },
];

export default function Header() {
  const pathname = usePathname();
  const initialScrolled = pathname !== "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(initialScrolled);
  const [useWhiteLogo, setUseWhiteLogo] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(initialScrolled || window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialScrolled]);

  const headerClasses = scrolled
    ? "bg-gradient-to-br from-[#E0F3FC] via-white to-white border-b shadow-sm"
    : "bg-transparent border-transparent shadow-none";

  const linkBase = scrolled
    ? "text-heading hover:text-primary"
    : "text-white hover:text-white/80";

  const iconColor = scrolled ? "text-primary-dark" : "text-white";

  return (
    <header className={`fixed w-full top-0 left-0 z-40 transition-colors duration-300 ${headerClasses}`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center h-14 sm:h-16 px-6">
        
        {/* Logo */}
        <Link href="/" className="block relative z-50">
          <Image
            src={(!scrolled && useWhiteLogo) ? "/images/Softlytix%20Official%20Logo%20-%20White.png" : "/softlytix-official-logo.png"}
            alt="Softlytix Logo"
            width={140}
            height={40}
            sizes="(max-width: 640px) 170px, 140px"
            className="w-auto h-10 sm:h-10 md:h-11 transition-all duration-200"
            priority
            onError={() => setUseWhiteLogo(false)}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 text-sm font-semibold items-center relative z-50">
          <Link href="/" className={`${linkBase} transition-colors px-3 py-2 rounded-md`}>
            Home
          </Link>
          <Link href="/about" className={`${linkBase} transition-colors px-3 py-2 rounded-md`}>
            About
          </Link>

          {/* Solutions Dropdown */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`text-sm font-semibold !bg-transparent !px-3 !py-2 rounded-md ${linkBase} hover:!bg-transparent focus:!bg-transparent data-[state=open]:!bg-transparent ${scrolled ? "hover:text-heading focus:text-heading data-[state=open]:text-heading" : "hover:text-white focus:text-white data-[state=open]:text-white"}`}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className="top-full mt-2 md:mt-2 md:absolute md:right-0 md:left-auto md:origin-top-right md:-translate-x-0 md:translate-y-0 left-4 right-4 w-auto md:w-[min(90vw,640px)] max-w-[min(95vw,640px)] md:mx-0 mx-auto overflow-auto max-h-[70vh] md:max-h-[80vh] rounded-xl border shadow-xl backdrop-blur-md bg-white/95 text-gray-800 dark:bg-[#0f172a]/95 dark:text-white z-50 data-[state=closed]:p-0 p-2"
                >
                  <ul className="grid gap-3 p-4 w-full max-w-[min(90vw,640px)] md:max-w-[640px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/40 p-6 no-underline outline-none focus:shadow-md"
                          href="/solutions"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            AI Solutions
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Discover our complete suite of AI-powered business tools.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {solutions.map((solution) => (
                      <ListItem
                        key={solution.title}
                        title={solution.title}
                        href={solution.href}
                      >
                        {solution.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/contact" className={`${linkBase} transition-colors px-3 py-2 rounded-md`}>
            Contact
          </Link>
          {/** Blog link temporarily removed until blog is ready */}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className={`md:hidden relative z-50 ${iconColor}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-50 bg-gradient-to-b from-[#E0F3FC] via-white to-white px-6 sm:px-8 py-8 sm:py-10 text-sm font-semibold text-primary-dark rounded-t-3xl shadow-2xl backdrop-blur-md"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
            }}
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-primary-dark hover:text-primary transition-colors" />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4 mt-10">
              <Link
                href="/"
                className="block hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Solutions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className="flex items-center justify-between w-full hover:text-primary transition-colors"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      solutionsOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      {solutions.map((solution) => (
                        <Link
                          key={solution.title}
                          href={solution.href}
                          className="block hover:text-primary py-1 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {solution.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="block hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {/** Blog link temporarily removed until blog is ready */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
