import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import ContactUs from '../components/ContactUs'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next';
const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Jane Smith', role: 'CTO', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Mike Johnson', role: 'COO', image: '/placeholder.svg?height=200&width=200' },
]

export default function About() {
  const {t} = useTranslation();
  return (
    <div className="min-h-screen bg-white">
       <Helmet>
          <title> Chika.ai | Hire faster</title>
          <meta name="description" content="Discover how Chika.ai streamlines the hiring process, connecting top talent with innovative companies through AI-powered recruitment." />
        </Helmet>
      {/* Hero Section */}
      <section className="relative h-96 bg-pink-600 overflow-hidden">
        <img src="/images/aboutus.jpg?height=600&width=1200" alt="Team working together" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-pink-600 opacity-50"></div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">{t('about.title')}</h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.whoWeAre')}</h2>
          <p className="text-lg text-gray-700 mb-6">
          {t('about.mission')}
          </p>
          <p className="text-lg text-gray-700">
          {t('about.founded')}
          </p>
        </div>
      </section>

      {/* Our Leadership Team Section */}
      <section className="py-20 bg-pink-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('about.leadershipTeam')}</h2>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.goalTitle')}</h2>
          <p className="text-lg text-gray-700 mb-6">
          {t('about.goal')}
          </p>
          <p className="text-lg text-gray-700">
          {t('about.vision')}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-pink-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.storyTitle')}</h2>
          <p className="text-lg text-gray-700 mb-6">
          {t('about.story')}
          </p>
          <p className="text-lg text-gray-700 mb-6">
          {t('about.origin')}
          </p>
          <p className="text-lg text-gray-700">
          {t('about.today')}
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactUs />
    </div>
  )
}