import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import ContactUs from '../components/ContactUs'
import { Helmet } from 'react-helmet-async'

const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Jane Smith', role: 'CTO', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Mike Johnson', role: 'COO', image: '/placeholder.svg?height=200&width=200' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
       <Helmet>
          <title> Chika.ai | Hire faster</title>
          <meta name="description" content="Discover how Chika.ai streamlines the hiring process, connecting top talent with innovative companies through AI-powered recruitment." />
        </Helmet>
      {/* Hero Section */}
      <section className="relative h-96 bg-pink-600 overflow-hidden">
        <img src="/aboutus.jpg?height=600&width=1200" alt="Team working together" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-pink-600 opacity-50"></div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">About Chika.ai</h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-6">
            Chika.ai is a cutting-edge AI-powered recruitment platform that connects top talent with innovative companies. Our mission is to revolutionize the hiring process, making it more efficient, accurate, and enjoyable for both employers and job seekers.
          </p>
          <p className="text-lg text-gray-700">
            Founded by a team of HR professionals and AI experts, we combine deep industry knowledge with state-of-the-art technology to create a seamless recruitment experience.
          </p>
        </div>
      </section>

      {/* Our Leadership Team Section */}
      <section className="py-20 bg-pink-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Goal</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Chika.ai, our goal is to transform the recruitment landscape by leveraging AI technology to create perfect matches between talented individuals and forward-thinking companies. We aim to reduce hiring time, improve the quality of hires, and enhance the overall recruitment experience for all parties involved.
          </p>
          <p className="text-lg text-gray-700">
            We envision a world where finding the right job or the right candidate is no longer a challenge, but an exciting and rewarding journey.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-pink-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6">
            Chika.ai was born out of a shared frustration with traditional recruitment methods. Our founders, having experienced the challenges of hiring and job seeking firsthand, saw an opportunity to revolutionize the process using AI technology.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Starting in a small office with a big dream, we've grown into a team of passionate individuals dedicated to making recruitment smarter, faster, and more human-centric.
          </p>
          <p className="text-lg text-gray-700">
            Today, we're proud to be partnering with some of the most innovative companies worldwide, helping them build their dream teams while assisting countless professionals in finding fulfilling careers.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactUs />
    </div>
  )
}