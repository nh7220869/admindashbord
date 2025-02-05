'use client';

import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing social media icons

export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          {/* Logo and About Section */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-extrabold text-yellow-400">Admin Dashboard</h2>
            <p className="text-sm mt-2">Your reliable admin interface for managing your platform&lsquo;s content, users, and more.</p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0 md:flex-row md:space-x-8">
            <a href="#" className="text-lg hover:text-yellow-400 transition-all">Privacy Policy</a>
            <a href="#" className="text-lg hover:text-yellow-400 transition-all">Terms of Service</a>
            <a href="#" className="text-lg hover:text-yellow-400 transition-all">Help Center</a>
            <a href="#" className="text-lg hover:text-yellow-400 transition-all">Contact</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-yellow-400">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-yellow-400">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-yellow-400">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-yellow-400">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
