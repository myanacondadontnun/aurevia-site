// Google Analytics tracking utilities

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

// Google Analytics measurement ID
export const GA_MEASUREMENT_ID = 'G-FS8M4682ZZ';

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
    });
  }
};

// Predefined event tracking functions
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('video_play', {
    video_title: videoTitle,
  });
};

export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName,
  });
};

export const trackOutboundClick = (url: string, linkText?: string) => {
  trackEvent('click', {
    outbound: true,
    link_url: url,
    link_text: linkText,
  });
};

export const trackSignUpAttempt = (method: string = 'email') => {
  trackEvent('sign_up', {
    method: method,
  });
};

export const trackPricingPlanView = (planName: string) => {
  trackEvent('view_item', {
    item_category: 'pricing_plan',
    item_name: planName,
  });
};

export const trackContactFormSubmit = (success: boolean = true) => {
  trackEvent('contact', {
    success: success,
  });
}; 