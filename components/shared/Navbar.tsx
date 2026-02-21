'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Stethoscope,
  Scan,
  Video,
  MapPin,
  History,
  User,
  Menu,
  X,
  Plus
} from 'lucide-react';

const navItems = [
  { name: 'Symptom Check', href: '/symptoms', icon: Stethoscope },
  { name: 'Scan Med', href: '/scan', icon: Scan },
  { name: 'Remedies', href: '/remedies', icon: Video },
  { name: 'Hospitals', href: '/hospitals', icon: MapPin },
  { name: 'History', href: '/history', icon: History },
];

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'hi', name: 'HI' },
  { code: 'kn', name: 'KN' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const pathname = usePathname();

  return (
    <nav className="sticky-nav">
      <div className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-icon">M</div>
          <span>MEDAI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}

          <div className="lang-switcher">
            {languages.map(l => (
              <button
                key={l.code}
                className={`lang-btn ${lang === l.code ? 'active' : ''}`}
                onClick={() => setLang(l.code)}
              >
                {l.name}
              </button>
            ))}
          </div>

          <Link href="/auth/login" className="btn btn-primary nav-btn">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle mobile-only"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="mobile-menu animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-link ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            <User size={20} />
            Profile / Sign In
          </Link>
        </div>
      )}

      <style jsx>{`
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          height: 70px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 1.2rem;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }
        .nav-btn {
          padding: 0.5rem 1.25rem;
          font-size: 0.9rem;
        }
        .lang-switcher {
          display: flex;
          background: var(--bg-alt);
          padding: 2px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }
        .lang-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          border-radius: 4px;
          background: transparent;
          color: var(--text-muted);
        }
        .lang-btn.active {
          background: white;
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        .mobile-only { display: none; }
        .desktop-only { display: flex; }

        .mobile-menu {
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          background: white;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: var(--shadow-lg);
          border-bottom: 1px solid var(--border);
        }
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-weight: 500;
        }
        .mobile-link.active {
          background: var(--secondary);
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }
      `}</style>
    </nav>
  );
}
