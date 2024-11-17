import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/features" className="text-base text-gray-500 hover:text-gray-900">AI Matching</Link></li>
              <li><Link to="/features" className="text-base text-gray-500 hover:text-gray-900">Talent Sourcing</Link></li>
              <li><Link to="/features" className="text-base text-gray-500 hover:text-gray-900">Analytics</Link></li>
              <li><Link to="/features" className="text-base text-gray-500 hover:text-gray-900">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/guides" className="text-base text-gray-500 hover:text-gray-900">Guides</Link></li>
              <li><Link to="/help" className="text-base text-gray-500 hover:text-gray-900">Help Center</Link></li>
              <li><Link to="/events" className="text-base text-gray-500 hover:text-gray-900">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact Us</Link></li>
              <li><a href="https://twitter.com/chikaai" className="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
              <li><a href="https://facebook.com/chikaai" className="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
              <li><a href="https://linkedin.com/company/chikaai" className="text-base text-gray-500 hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="https://facebook.com/chikaai" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/chikaai" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/chikaai" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/company/chikaai" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <LinkedIn className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 chika.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}