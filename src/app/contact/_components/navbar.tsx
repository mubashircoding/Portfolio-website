'use client';
import {motion} from 'framer-motion';



import { siteConfig } from '@/config/site';
export const Navbar = () => {
return(
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
    <div className="container-max px-4 py-4">
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-2xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {siteConfig.personal.name}
        </motion.h1>
        <div className="flex space-x-6">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </nav>
)
}
