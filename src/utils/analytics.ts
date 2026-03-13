// Google Tag Manager event tracking
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackPageView = (url: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page: {
      path: url,
      title: document.title
    }
  });
};

export const trackEvent = (eventName: string, eventData: Record<string, any>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventData
  });
};

// Common events
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', { button_name: buttonName });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submission', { form_name: formName });
};

export const trackWhatsAppClick = () => {
  trackEvent('social_click', { social_platform: 'whatsapp' });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent('service_view', { service_name: serviceName });
};

export const trackBookingStart = () => {
  trackEvent('begin_checkout', { booking_status: 'start' });
};

export const trackBookingComplete = () => {
  trackEvent('purchase', { booking_status: 'complete' });
}; 