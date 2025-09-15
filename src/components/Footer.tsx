import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2937] text-white py-12 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/softlytix-official-logo.png"
                alt="Softlytix Logo"
                width={32}
                height={32}
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-heading font-bold">Softlytix</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering service businesses with AI-powered automation tools that enhance productivity while preserving the human touch.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Links */}
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Visit our GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal & Support</h4>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Support
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Softlytix. All rights reserved. {"|"} <span className="text-gray-500">Built with AI-first principles</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

