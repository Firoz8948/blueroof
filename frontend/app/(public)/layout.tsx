/**
 * Public Layout
 * Shared layout for all public-facing pages
 * Includes Header and Footer components
 */

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomePopup from '@/components/modals/WelcomePopup';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative">{children}</main>
      <Footer />
      <WelcomePopup />
    </div>
  );
}

