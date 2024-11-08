import { useAuth0 } from '@auth0/auth0-react';
import { CheckCircle, Calendar, UserPlus, FileText } from "lucide-react"
import { Link } from 'react-router-dom';

export default function Home () {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen bg-white">

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">The Modern Way to Source Top Talent</h2>
          <p className="text-xl text-gray-600 mb-8">Effortlessly connect with high-matching, interested candidates for your roles.</p>
          {isAuthenticated ? (
            <button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
              <Link to="/profile">Go to Profile</Link>
            </button>
          ) : (
            <button size="lg" className="bg-pink-600 hover:bg-pink-700" onClick={() => loginWithRedirect()}>
              Get Started
            </button>
          )}
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div>
            <div className="p-6 flex flex-col items-center text-center">
              <FileText className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Job Description</h3>
              <p className="text-gray-600">Fill out a simple form to describe your ideal candidate and role requirements.</p>
            </div>
          </div>
          <div>
            <div className="p-6 flex flex-col items-center text-center">
              <UserPlus className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Continuous Matching</h3>
              <p className="text-gray-600">Our AI continuously presents high-matching candidates interested in your role.</p>
            </div>
          </div>
          <div>
            <div className="p-6 flex flex-col items-center text-center">
              <Calendar className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Scheduling</h3>
              <p className="text-gray-600">Approve a candidate and a meeting is automatically set up via Calendly.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ol className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                  <span>Fill out the job description form</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                  <span>Review continuously matched candidates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                  <span>Approve or reject candidates with one click</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                  <span>Automatic meeting setup via Calendly</span>
                </li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Start Finding Your Perfect Candidate</h3>
              <form className="space-y-4">
                <input placeholder="Your Name" />
                <input placeholder="Company Name" />
                <input placeholder="Email Address" />
                <button className="w-full bg-pink-600 hover:bg-pink-700">Get Started</button>
              </form>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xl text-gray-600 mb-8">Join beacon.ai today and experience the future of talent sourcing.</p>
          <button size="lg" className="bg-pink-600 hover:bg-pink-700">Sign Up Now</button>
        </section>
      </main>
    </div>
  )
}