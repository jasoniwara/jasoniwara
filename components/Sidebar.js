'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Sidebar({ site, nav, open, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      const onKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [open, onClose]);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-paper border-l border-rule
          transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-8 md:px-10 py-8 overflow-y-auto">
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="kicker text-soft mb-1">Table of Contents</p>
              <p className="font-serif lowercase text-xl text-ink">{site.name}</p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close navigation"
              className="text-2xl leading-none text-ink hover:text-press transition-colors duration-200 mt-1"
            >
              &times;
            </button>
          </div>

          <nav className="flex-1">
            <ul>
              {nav.map((item, i) => (
                <li
                  key={item.label}
                  className="border-b border-rule"
                  style={{
                    transitionDelay: open ? `${80 + i * 40}ms` : '0ms',
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-baseline py-4 transition-all duration-500
                      ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}
                  >
                    <span className="font-serif text-lg md:text-xl text-ink group-hover:text-press transition-colors duration-200">
                      {item.label}
                    </span>
                    <span className="dot-leader" aria-hidden="true" />
                    <span className="kicker text-soft">{item.page}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-8 mt-auto">
            <p className="kicker text-soft">{site.established} &middot; {site.dateline}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
