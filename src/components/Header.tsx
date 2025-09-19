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
    title: "AI Websites & Web Apps",
    href: "/?service=webapps#solutions",
    description: "Create websites and apps enhanced with AI features like chatbots, personalization, and analytics",
  },
  {
    title: "Workflow Automation",
    href: "/?service=automation#solutions",
    description: "Eliminate repetitive tasks with AI-driven automation—from follow-ups to reporting",
  },
  {
    title: "Custom AI SaaS Products",
    href: "/?service=saas#solutions",
    description: "Build and launch scalable AI SaaS platforms—from idea to deployment",
  },
  {
    title: "Voice & Chat AI Assistants",
    href: "/?service=voice#solutions",
    description: "Engage customers with conversational AI via chat or voice",
  },
  {
    title: "AI Email & CRM Assistants",
    href: "/?service=crm#solutions",
    description: "Personalize outreach and manage leads directly in your CRM",
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
        <nav className="hidden md:flex gap-2 text-sm font-medium items-center relative z-50">
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
                  className={`text-sm font-medium !bg-transparent !px-3 !py-2 rounded-md ${linkBase} hover:!bg-transparent focus:!bg-transparent data-[state=open]:!bg-transparent ${scrolled ? "hover:text-heading focus:text-heading data-[state=open]:text-heading" : "hover:text-white focus:text-white data-[state=open]:text-white"}`}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className="top-full mt-2 md:mt-2 md:absolute md:right-0 md:left-auto md:origin-top-right md:-translate-x-0 md:translate-y-0 left-4 right-4 w-auto md:w-[min(90vw,700px)] max-w-[min(95vw,700px)] md:mx-0 mx-auto overflow-auto max-h-[85vh] md:max-h-[90vh] rounded-xl border border-slate-200 shadow-xl backdrop-blur-md bg-slate-800/95 text-white z-50 data-[state=closed]:p-0 p-2"
                >
                  <ul className="grid gap-2 p-3 w-full max-w-[min(90vw,700px)] md:max-w-[700px] lg:grid-cols-2">
                    <li className="lg:col-span-2">
                      <div className="flex h-full w-full select-none flex-col justify-center rounded-xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 border border-slate-500/40 p-4">
                        <div className="mb-2 text-lg font-semibold text-white">
                          AI Solutions
                        </div>
                        <p className="text-sm leading-relaxed text-slate-200 mb-3">
                          Discover our complete suite of AI-powered business tools and applications.
                        </p>
                        <NavigationMenuLink asChild>
                          <Link
                            className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 text-sm transition-colors duration-200 hover:shadow-md"
                            href="/demo/voice-chat"
                          >
                            AI Voice Chat App
                          </Link>
                        </NavigationMenuLink>
                      </div>
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
            className="md:hidden fixed inset-0 z-50 bg-gradient-to-b from-[#E0F3FC] via-white to-white text-sm font-medium text-primary-dark rounded-t-3xl shadow-2xl backdrop-blur-md overflow-y-auto"
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
            <nav className="space-y-3 mt-10 px-6 sm:px-8 pb-8">
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
                      className="mt-2 space-y-2 overflow-hidden"
                    >
                      {/* AI Solutions Header */}
                      <div className="rounded-lg bg-slate-700 border border-slate-600 p-3">
                        <div className="mb-2 text-base font-semibold text-white">
                          AI Solutions
                        </div>
                        <p className="text-sm text-slate-200 mb-3 leading-snug">
                          Discover our complete suite of AI-powered business tools and applications.
                        </p>
                        <Link
                          href="/demo/voice-chat"
                          className="inline-flex items-center justify-center rounded-md bg-primary hover:bg-primary-dark text-white font-medium px-3 py-2 text-sm transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          AI Voice Chat App
                        </Link>
                      </div>

                      {/* Solutions List */}
                      <div className="pl-2 space-y-2">
                        {solutions.map((solution) => (
                          <Link
                            key={solution.title}
                            href={solution.href}
                            className="block hover:text-primary py-1 transition-colors text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {solution.title}
                          </Link>
                        ))}
                      </div>
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
