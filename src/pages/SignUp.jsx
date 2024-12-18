import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sign up logic here
    //console.log('Sign up:', { email, password, companyName })
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
       <div className="bg-white w-full max-w-md shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Sign Up for chika.ai</h2>
        </div>
        <div className='p-6'>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                placeholder="Your Company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}