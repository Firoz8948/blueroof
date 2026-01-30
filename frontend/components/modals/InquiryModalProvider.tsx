/**
 * Global Inquiry Modal Provider
 * Allows opening the expert/site-visit modal from anywhere (header, hero, cards)
 */

'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import PropertyInquiryModal, { type InquiryType } from '@/components/modals/PropertyInquiryModal';

type PropertyLite = {
  id: string;
  title: string;
  location: string;
  price?: string;
  images: string[];
};

type InquiryModalState = {
  isOpen: boolean;
  type: InquiryType;
  property: PropertyLite;
};

type InquiryModalContextValue = {
  openExpert: (property?: PropertyLite) => void;
  openSiteVisit: (property: PropertyLite) => void;
  close: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

const DEFAULT_EXPERT_PROPERTY: PropertyLite = {
  id: 'expert',
  title: 'Talk to Our Expert',
  location: 'Virar • Nallasopara • Vasai • Mumbai',
  price: 'Get best deals',
  images: ['/brr1.png', '/brr2.png', '/brr3.png'],
};

export function InquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<InquiryModalState | null>(null);

  const value = useMemo<InquiryModalContextValue>(
    () => ({
      openExpert: (property) => {
        setState({
          isOpen: true,
          type: 'expert',
          property: property ?? DEFAULT_EXPERT_PROPERTY,
        });
      },
      openSiteVisit: (property) => {
        setState({
          isOpen: true,
          type: 'site-visit',
          property,
        });
      },
      close: () => setState(null),
    }),
    []
  );

  return (
    <InquiryModalContext.Provider value={value}>
      {children}
      <PropertyInquiryModal
        isOpen={state?.isOpen ?? false}
        onClose={() => setState(null)}
        type={state?.type ?? 'expert'}
        property={state?.property ?? DEFAULT_EXPERT_PROPERTY}
      />
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) {
    throw new Error('useInquiryModal must be used within InquiryModalProvider');
  }
  return ctx;
}

