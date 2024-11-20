import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from 'react-i18next';


export function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated,  user } = useAuth0();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('English')
    const { i18n } = useTranslation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const handleLanguageChange = (lang) => {
      i18n.changeLanguage(lang); // Dynamically change language
    };

    // const toggleLanguage = () => {
    //   setLanguage(prev => prev === 'English' ? handleLanguageChange("fr")  && 'French' : handleLanguageChange("en") && 'English')
    // }
    const toggleLanguage = () => {
      if (language === 'English') {
        handleLanguageChange("fr");
        setLanguage('French');
      } else {
        handleLanguageChange("en");
        setLanguage('English');
      }
    };

    const isAdmin = user && user.role?.includes('admin')

    const handleLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/profile",
          },
        //   authorizationParams: {
        //     screen_hint: "signup",
        //   }
        });
    };
    
  return (
    <nav className=" shadow-sm py-4 bg-gradient-to-r from-pink-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/images/pinkLogo.png" alt="chika.ai" />
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600">About</Link>
          {/* <Link to="/features" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600">Features</Link> */}
          <Link to="/how-it-works" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600">How It Works</Link>
          {/* <Link to="/pricing" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600">Get Pricing</Link> */}
          {isAuthenticated && (
            <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600">Profile</Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600">Admin</Link>
          )}
            <div className="flex items-center ml-4">
              <span className="mr-2 text-sm font-medium text-pink-700">{language}</span>
              <Switch checked={language === 'French'} 
             // onCheckedChange={()=>handleLanguageChange(language)}
              onCheckedChange={toggleLanguage} 
              />
            </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-4 flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.picture} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => logout({ returnTo: window.location.origin })}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => loginWithRedirect()} className="ml-4 bg-pink-600 hover:bg-pink-700 text-white">Log in</Button>
          )}
        </div>
        <div className="flex items-center sm:hidden">
          <Button variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6 text-pink-600" /> : <Menu className="h-6 w-6 text-pink-600" />}
          </Button>
        </div>
      </div>
    </div>
    {isMenuOpen && (
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50">About</Link>
          <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50">Features</Link>
          <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50">Pricing</Link>
          {isAuthenticated && (
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50">Profile</Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50">Admin</Link>
          )}
          <div className="flex items-center px-3 py-2">
            <span className="mr-2 text-sm font-medium text-pink-700">{language}</span>
            <Switch checked={language === 'French'} onCheckedChange={toggleLanguage} />
          </div>
          {isAuthenticated ? (
            <Button onClick={() => logout({ returnTo: window.location.origin })} className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white">Log out</Button>
          ) : (
            <Button onClick={() => loginWithRedirect()} className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white">Log in</Button>
          )}
        </div>
      </div>
    )}
  </nav>
  )
}