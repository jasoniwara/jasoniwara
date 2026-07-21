'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function SiteChrome({ site, nav, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header site={site} onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar site={site} nav={nav} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-20">{children}</main>
      <Footer site={site} />
    </>
  );
}
