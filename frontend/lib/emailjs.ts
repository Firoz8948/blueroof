/**
 * EmailJS helper
 * Centralized lead email sender for all website forms.
 */

'use client';

import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_9ovfx4b';
const EMAILJS_TEMPLATE_ID = 'template_k4sgsng';
const EMAILJS_PUBLIC_KEY = 'I1hPD6LpGsg-M8nzC';

export type LeadEmailParams = {
  lead_source: string;
  lead_action: string;
  property_name?: string;
  property_location?: string;
  property_price?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_message?: string;
  preferred_city?: string;
  page_url?: string;
  submitted_at?: string;
};

function normalizeLeadParams(params: LeadEmailParams) {
  const propertyName = params.property_name?.trim() || 'General Enquiry';
  const customerName = params.customer_name.trim() || 'Unknown';

  return {
    lead_source: params.lead_source,
    lead_action: params.lead_action,
    property_name: propertyName,
    property_location: params.property_location?.trim() || 'N/A',
    property_price: params.property_price?.trim() || 'N/A',
    customer_name: customerName,
    customer_phone: params.customer_phone.trim() || 'N/A',
    customer_email: params.customer_email?.trim() || 'N/A',
    customer_message: params.customer_message?.trim() || 'N/A',
    preferred_city: params.preferred_city?.trim() || 'N/A',
    page_url:
      params.page_url?.trim() ||
      (typeof window !== 'undefined' ? window.location.href : 'N/A'),
    submitted_at: params.submitted_at || new Date().toLocaleString('en-IN'),
    // Optional extra variable in case template subject uses {{subject}}
    subject: `New Property Lead - ${propertyName} | ${customerName}`,
  };
}

export async function sendLeadEmail(params: LeadEmailParams) {
  const templateParams = normalizeLeadParams(params);

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
}

