# Mubashir Qadri - Professional Portfolio Website

A modern, interactive, and immersive portfolio website built with Next.js, showcasing professional experience, personal projects, and a contact form that sends emails directly to your Gmail.

## 🚀 Features

- **Interactive Design**: Smooth animations and transitions using Framer Motion
- **Responsive Layout**: Mobile-first design that works on all devices
- **Professional Sections**: Hero, About, Projects, and Contact sections
- **Contact Form**: Integrated EmailJS for sending emails to your Gmail
- **Modern UI**: Beautiful design with Tailwind CSS and custom components
- **Performance Optimized**: Built with Next.js 15 for optimal performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up EmailJS** (Required for contact form)
   
   a. Go to [EmailJS](https://www.emailjs.com/) and create a free account
   
   b. Create a new Email Service (Gmail recommended)
   
   c. Create an email template with the following variables:
      - `{{user_name}}` - Sender's name
      - `{{user_email}}` - Sender's email
      - `{{subject}}` - Email subject
      - `{{message}}` - Email message
   
   d. Get your credentials:
      - Service ID
      - Template ID
      - Public Key

4. **Configure EmailJS**
   
   Update the following files with your EmailJS credentials:
   
   - `src/app/contact/page.tsx` (lines 30, 40-43)
   - `src/app/page.tsx` (ContactForm component)
   
   Replace the placeholder values:
   ```typescript
   emailjs.init('YOUR_PUBLIC_KEY');
   
   const result = await emailjs.sendForm(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     formRef.current!,
     'YOUR_PUBLIC_KEY'
   );
   ```

5. **Customize Content**
   
   Update the following in `src/app/page.tsx`:
   - Personal information (name, email, phone, location)
   - Social media links (GitHub, LinkedIn)
   - Project details and descriptions
   - Skills and experience levels
   - Resume download link

## 🎨 Customization

### Personal Information
Update the hero section and contact information with your details:
```typescript
// In src/app/page.tsx
<h1 className="text-5xl md:text-7xl font-bold mb-6">
  Hi, I'm{' '}
  <span className="gradient-text">Your Name</span>
</h1>
```

### Projects
Modify the projects array to showcase your actual work:
```typescript
const projects = [
  {
    title: "Your Project Title",
    description: "Project description...",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/yourusername/project",
    live: "https://your-project.com"
  }
];
```

### Skills
Update the skills array with your expertise:
```typescript
const skills = [
  { name: "Your Skill", icon: Code, level: 90 }
];
```

### Colors and Styling
Customize the color scheme by modifying the Tailwind classes:
- Primary blue: `blue-600`
- Gradient colors: `from-blue-600 to-purple-600`
- Background colors: `gray-50`, `white`

## 🚀 Development

1. **Run development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Start production server**
   ```bash
   npm start
   ```

## 📧 EmailJS Setup Guide

### Step 1: Create EmailJS Account
1. Visit [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose "Gmail" as your email provider
4. Connect your Gmail account
5. Note down the Service ID

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:
   ```
   Subject: New Portfolio Contact: {{subject}}
   
   Name: {{user_name}}
   Email: {{user_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
4. Note down the Template ID

### Step 4: Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your Public Key

### Step 5: Update Code
Replace the placeholder values in your code with the actual IDs and keys.

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **Railway**: Connect your GitHub repository
- **DigitalOcean App Platform**: Deploy from GitHub

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first design approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized typography for all screen sizes

## 🔧 Troubleshooting

### EmailJS Issues
- Verify all credentials are correct
- Check EmailJS service status
- Ensure template variables match form field names
- Test with EmailJS dashboard

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Styling Issues
- Verify Tailwind CSS is properly configured
- Check for CSS conflicts
- Ensure all classes are valid Tailwind classes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you need help setting up EmailJS or have any questions:
- Email: mubashirkaiser2009@gmail.com
- Create an issue in this repository

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
