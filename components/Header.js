'use client';

import Link from 'next/link';

export default function Header({ site, onOpenSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-rule">
      <div className="max-w-content mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="leading-none">
          <span className="text-2xl md:text-3xl font-serif lowercase tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <button
          onClick={onOpenSidebar}
          aria-label="Open navigation index"
          aria-haspopup="true"
          className="group flex flex-col items-end gap-[6px] py-2 pl-4"
        >
          <span className="kicker text-soft hidden sm:inline mr-1">Index</span>
          <span className="sr-only">Menu</span>
          <span
            aria-hidden="true"
            className="block h-[1.5px] w-7 bg-ink transition-all duration-300 group-hover:w-8"
          />
          <span
            aria-hidden="true"
            className="block h-[1.5px] w-7 bg-ink transition-all duration-300 group-hover:w-5"
          />
        </button>
      </div>
    </header>
  );
}
