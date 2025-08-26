// EmailJS Configuration
// Environment variables are loaded from .env.local

export const EMAILJS_CONFIG = {
  // Your EmailJS Public Key
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  
  // Your EmailJS Service ID (Gmail service)
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  
  // Your EmailJS Template ID
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  
  // Email template variables
  TEMPLATE_VARIABLES: {
    USER_NAME: 'user_name',
    USER_EMAIL: 'user_email',
    SUBJECT: 'subject',
    MESSAGE: 'message'
  }
};

// Debug function to check configuration
export const debugEmailJSConfig = () => {
  console.log('EmailJS Configuration:', {
    PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'SET' : 'NOT SET',
    SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID ? 'SET' : 'NOT SET',
    TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID ? 'SET' : 'NOT SET',
    TEMPLATE_VARIABLES: EMAILJS_CONFIG.TEMPLATE_VARIABLES
  });
};

// EmailJS initialization function
export const initEmailJS = async () => {
  if (typeof window !== 'undefined') {
    // Only initialize on client side
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
      debugEmailJSConfig();
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }
};

// EmailJS send function
export const sendEmail = async (formRef: HTMLFormElement) => {
  if (typeof window !== 'undefined') {
    try {
      console.log('Attempting to send email...');
      console.log('Form data:', new FormData(formRef));
      
      const { default: emailjs } = await import('@emailjs/browser');
      
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      console.log('Email sent successfully:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error };
    }
  }
  
  return { success: false, error: 'Client side only' };
};
