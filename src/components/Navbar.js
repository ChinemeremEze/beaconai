import { Link } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';

export function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            beacon.ai
          </Link>
          <div className="space-x-4">
            <button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </button>
            <button variant="ghost" asChild>
              <Link to="/features">Features</Link>
            </button>
            <button variant="ghost" asChild>
              <Link to="/pricing">Pricing</Link>
            </button>
           {isAuthenticated ? (
              <>
                <button variant="ghost" asChild>
                  <Link to="/profile">Profile</Link>
                </button>
                <button variant="default" onClick={() => logout({ returnTo: window.location.origin })}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button variant="default" onClick={() => loginWithRedirect()}>
                    Log In
                </button>

                <button variant="default" onClick={() => loginWithRedirect()}>
                    Sign Up
                </button>

              </>

            )}
          </div>
        </nav>
      </div>
    </header>
  )
}