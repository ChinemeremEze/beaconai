import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-gray-50 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600">&copy; 2024 beacon.ai. All rights reserved.</p>
          </div>
          <div className="w-full md:w-auto text-center md:text-right">
            <nav className="space-x-4">
              <Link to="/privacy" className="text-gray-600 hover:text-pink-600">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-pink-600">Terms of Service</Link>
              <Link to="/contact" className="text-gray-600 hover:text-pink-600">Contact Us</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
