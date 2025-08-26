// Site Configuration
// Update these values with your personal information

export const siteConfig = {
  // Personal Information
  personal: {
    name: "Mubashir Qadri",
    title: "Full-Stack Developer",
    email: "mubashirkaiser2009@gmail.com",
    phone: "+1 (647) 773-7748",
    location: "ON, Canada",
    bio: "I'm a passionate full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems through clean, efficient code.",
  },

  // Social Media Links
  social: {
    github: "https://github.com/mubashircoding",
    linkedin: "https://www.linkedin.com/in/syed-mubashir-6b1667292/",
  },

  // Skills and Experience
  skills: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 90 },
    { name: "JAVASCRIPT", level: 90 },
    { name: "TYPESCRIPT", level: 90 },
    { name: "PYTHON", level: 90 }
  ],

  // Featured Projects
  projects: [
    {
      title: "Taskify A Trello Clone",
      description: "An end-to-end fullstack and trello clone, all with workspaces, boards, lists, cards, audit logs / activity as well as member roles.",
      technologies: ["Typescript", "Next.js", "Node.js", "Clerk", "PrismaORM", "Shadcn", "Stripe"],
      github: "https://github.com/mubashircoding/trello",
      live: "https://trello-five-mocha.vercel.app/",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/yourusername/task-manager",
      live: "https://task-manager-demo.com",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts, charts, and responsive design for mobile and desktop.",
      technologies: ["Next.js", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      github: "https://github.com/mubashircoding/Weather-APo",
      live: "https://weather-api-react-responsive.netlify.app/",
      image: "/api/placeholder/400/250"
    }
  ],

  // Contact Form Configuration
  contact: {
    title: "Get In Touch",
    subtitle: "I'm always interested in new opportunities and exciting projects. Feel free to reach out and let's discuss how we can work together!",
    successMessage: "Thank you for reaching out. I'll get back to you within 24 hours.",
    errorMessage: "Something went wrong. Please try again or contact me directly.",
  },

  // Navigation
  navigation: [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/contact" },
  ],

  // SEO
  seo: {
    title: "Mubashir Qadri - Portfolio",
    description: "Professional portfolio showcasing my experience, projects, and skills in software development",
    keywords: ["portfolio", "developer", "software engineer", "web development", "projects"],
    author: "Mubashir Qadri",
    creator: "Mubashir Qadri",
  }
};
