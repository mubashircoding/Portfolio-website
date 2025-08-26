'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, X, AlertCircle } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { initEmailJS, sendEmail } from '@/lib/emailjs';

// Form validation schema using Zod
const contactFormSchema = z.object({
  user_name: z.string()
    .min(1, 'Name is required')
    .min(4, 'Name must be at least 4 characters'),
  user_email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  subject: z.string()
    .min(1, 'Subject is required'),
  message: z.string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      user_name: '',
      user_email: '',
      subject: '',
      message: ''
    }
  });

  // Watch form values for real-time validation feedback
  const watchedValues = watch();

  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();
  }, []);

  // Show error toast
  const showError = (message: string) => {
    setErrorToastMessage(message);
    setShowErrorToast(true);
    setTimeout(() => setShowErrorToast(false), 5000);
  };

  // Show success toast
  const showSuccess = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  // Form submission handler
  const onSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      if (formRef.current) {
        const result = await sendEmail(formRef.current);
        
        if (result.success) {
          setSubmitStatus('success');
          showSuccess();
          reset(); // Reset form using React Hook Form
        } else {
          setSubmitStatus('error');
          showError('Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      showError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Handle form submission errors
  const onError = (errors: Record<string, { message?: string }>) => {
    const errorMessages = Object.values(errors).map((error) => error.message || 'Unknown error');
    const errorText = errorMessages.length === 1 
      ? errorMessages[0] 
      : `Please fix ${errorMessages.length} errors: ${errorMessages.join(', ')}`;
    showError(errorText);
  };

  // Get field validation state for styling
  const getFieldStyle = (fieldName: keyof ContactFormData) => {
    const hasError = errors[fieldName];
    const hasValue = watchedValues[fieldName] && watchedValues[fieldName].trim();
    const isTouched = errors[fieldName] !== undefined;

    if (hasError) {
      return 'border-red-500 focus:ring-red-500';
    }
    if (isTouched && hasValue) {
      return 'border-green-500 focus:ring-green-500';
    }
    return 'border-gray-300 focus:ring-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Toast Notifications */}
      <AnimatePresence>
        {showErrorToast && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md mx-4 border-2 border-red-600"
          >
            <AlertCircle size={20} className="flex-shrink-0" />
            <span className="font-medium">{errorToastMessage}</span>
            <button
              onClick={() => setShowErrorToast(false)}
              className="ml-auto p-1 hover:bg-red-600 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
        
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md mx-4 border-2 border-green-600"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">Message sent successfully!</span>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="ml-auto p-1 hover:bg-green-600 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. 
            Feel free to reach out and let&apos;s discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-semibold mb-6">Let&apos;s Connect</h2>
              <p className="text-gray-600 mb-8">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I&apos;d love to hear from you. I&apos;m always open to discussing new opportunities and 
                interesting ideas.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href="mailto:mubashirkaiser2009@gmail.com" 
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    mubashirkaiser2009@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a 
                    href="tel:+6477737748" 
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    +1 (647) 773-7748
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">ON, Canada</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/mubashircoding" 
                  className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                >
                  <Github />
                </a>
                <a 
                  href="https://www.linkedin.com/in/syed-mubashir-6b1667292/" 
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    {...register('user_name')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getFieldStyle('user_name')}`}
                    placeholder="Your full name"
                  />
                  {errors.user_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.user_name.message}</p>
                  )}
                  {!errors.user_name && watchedValues.user_name && watchedValues.user_name.trim() && (
                    <p className="text-green-500 text-xs mt-1">✓ Name looks good!</p>
                  )}
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    {...register('user_email')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getFieldStyle('user_email')}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.user_email && (
                    <p className="text-red-500 text-xs mt-1">{errors.user_email.message}</p>
                  )}
                  {!errors.user_email && watchedValues.user_email && watchedValues.user_email.trim() && (
                    <p className="text-green-500 text-xs mt-1">✓ Email looks good!</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getFieldStyle('subject')}`}
                  placeholder="What&apos;s this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
                {!errors.subject && watchedValues.subject && watchedValues.subject.trim() && (
                  <p className="text-green-500 text-xs mt-1">✓ Subject looks good!</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${getFieldStyle('message')}`}
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
                {!errors.message && watchedValues.message && watchedValues.message.trim() && (
                  <p className="text-green-500 text-xs mt-1">✓ Message looks good!</p>
                )}
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-sm mt-1">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Failed to send message</span>
                  </div>
                  <p className="text-sm mt-1">Please try again or contact me directly at mubashirkaiser2009@gmail.com</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || !isValid || !isDirty}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
              
              {/* Form validation helper */}
              {!isValid && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  Please fill in all required fields correctly
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
