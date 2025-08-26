# EmailJS Setup Guide

## Why Emails Aren't Being Sent

The contact form isn't sending emails because the EmailJS configuration is missing. You need to set up environment variables with your EmailJS credentials.

## Step 1: Create .env.local File

Create a file called `.env.local` in your project root (same level as `package.json`) with the following content:

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Step 2: Get Your EmailJS Credentials

1. **Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)**
2. **Sign up/Login** to your account
3. **Get your Public Key** from Account → API Keys
4. **Create a Service** (Gmail, Outlook, etc.) and get the Service ID
5. **Create an Email Template** and get the Template ID

## Step 3: Update .env.local

Replace the placeholder values with your actual credentials:

```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123def456ghi789
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xyz123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_abc456
```

## Step 4: Restart Your Development Server

After creating `.env.local`, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

## Step 5: Test the Configuration

1. **Click "Check EmailJS Config"** button on the contact page
2. **Check browser console** for configuration status
3. **Try submitting the form** - you should now receive emails!

## Email Template Variables

Your EmailJS template should use these variable names:
- `{{user_name}}` - User's full name
- `{{user_email}}` - User's email address
- `{{subject}}` - Email subject
- `{{message}}` - User's message

## Troubleshooting

- **Check browser console** for error messages
- **Verify environment variables** are loaded (should show "SET" not "NOT SET")
- **Ensure EmailJS service is active** in your dashboard
- **Check spam folder** for test emails

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your EmailJS credentials are correct
3. Make sure your EmailJS service is properly configured
4. Check that your email template variables match the form field names
