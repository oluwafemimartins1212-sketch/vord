import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vord Wa Bot – WhatsApp Bot Framework by Victory Lord',
  description: 'Powerful, customizable WhatsApp bot framework. Create, deploy, and manage WhatsApp bots with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Vord
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="/session" className="hover:text-purple-400 transition">Session</a>
              <a href="/deploy" className="hover:text-purple-400 transition">Deploy</a>
              <a href="/plugins" className="hover:text-purple-400 transition">Plugins</a>
              <a href="/suggest" className="hover:text-purple-400 transition">Suggest</a>
              <a href="https://github.com/oluwafemimartins1212-sketch/vord" target="_blank" className="hover:text-purple-400 transition">Repo</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
          <p>© 2026 Vord. Created by Victory Lord Himself</p>
        </footer>
      </body>
    </html>
  );
}