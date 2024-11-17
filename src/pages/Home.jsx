import React, { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { motion, useAnimation, useInView} from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Users, Briefcase, TrendingUp, FileText, Search, Mail, Calendar, Database, Filter } from 'lucide-react'
import ContactUs from '../components/ContactUs'
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import AnimatedText from '../components/AnimatedText';
const features = [
  { icon: <Users className="h-6 w-6" />, title: 'Talent Sourcing', description: 'Find top-tier candidates effortlessly' },
  { icon: <Briefcase className="h-6 w-6" />, title: 'Job Matching', description: 'AI-powered matching for perfect fits' },
  { icon: <CheckCircle className="h-6 w-6" />, title: 'Streamlined Hiring', description: 'Accelerate your hiring process' },
  { icon: <TrendingUp className="h-6 w-6" />, title: 'Analytics', description: 'Data-driven insights for better decisions' },
]

const testimonials = [
  { name: 'Sarah Johnson', role: 'HR Manager', company: 'TechCorp', content: 'Chika.ai has revolutionized our hiring process. We\'ve found amazing talent in record time!' },
  { name: 'Michael Chen', role: 'CEO', company: 'StartupX', content: 'The AI-powered matching is incredible. It\'s like the platform knows exactly what we\'re looking for.' },
  { name: 'Emily Rodriguez', role: 'Talent Acquisition', company: 'GrowthCo', content: 'The analytics provided by Chika.ai have helped us make data-driven decisions in our recruitment strategy.' },
]
const howItWorksSteps = [
  { icon: <FileText className="h-12 w-12 text-pink-600" />, title: 'Create Campaign', description: 'Clients create a campaign with job descriptions for an open role they are hiring for.' },
  { icon: <Search className="h-12 w-12 text-pink-600" />, title: 'AI Analysis', description: 'We analyze their job description using AI and get A+ prospects that match their criteria.' },
  { icon: <Mail className="h-12 w-12 text-pink-600" />, title: 'Outreach', description: 'We create outreach sequences that send out messages to these candidates via email.' },
  { icon: <Calendar className="h-12 w-12 text-pink-600" />, title: 'Meeting Setup', description: 'When a candidate is approved by our client, a meeting is set up with both parties.' },
]
const stats = [
  { value: '500', label: 'Candidate Info Available', icon: Database },
  { value: '240', label: 'Advanced Sourcing Filters', icon: Filter },
  { value: '700', label: 'Booked Interviews', icon: Calendar },
]
const partnerLogos = [
  { name: 'LinkedIn', logo: 'https://download.logo.wine/logo/LinkedIn/LinkedIn-Logo.wine.png?height=50&width=120&text=TechCorp&fontColor=%23fff&backgroundColor=%23FF69B4' },
  { name: 'Indeed', logo: '/indeed.svg?height=50&width=120&text=TechCorp&fontColor=%23fff&backgroundColor=%23FF69B4' },
  { name: 'Wellfound', logo: 'https://www.newsweek.com/vault/wp-content/uploads/2023/12/wellfound-lockup-black.png?height=50&width=120&text=TechCorp&fontColor=%23fff&backgroundColor=%23FF69B4' },
  { name: 'Github', logo: 'https://cdn.worldvectorlogo.com/logos/github-2.svg?height=50&width=120&text=TechCorp&fontColor=%23fff&backgroundColor=%23FF69B4' },
  { name: 'Google', logo: 'https://www.svgrepo.com/show/303183/google-2015-logo.svg?height=50&width=120&text=TechCorp&fontColor=%23fff&backgroundColor=%23FF69B4' },
  { name: 'Glassdor', logo: 'https://cdn.worldvectorlogo.com/logos/glassdoor.svg?height=50&width=120&text=TechCorp&fontColor=%23fff&backgroundColor=%23FF69B4' },
]
export default function Home () {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const logoContainerRef = useRef(null)
  const logoAnimation = useAnimation()
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // const [ref, isInView] = useInView({
  //   triggerOnce: false,
  //   threshold: 0.1,
  // })

  useEffect(() => {
    const animate = async () => {
      if (logoContainerRef.current) {
        const containerWidth = logoContainerRef.current.offsetWidth
        const totalWidth = partnerLogos.length * 200 // Total width of logos

        await logoAnimation.start({
          x: [`0%`, `-${(totalWidth / containerWidth) * 100}%`],
          transition: {
            x: {
              duration: 50,
              ease: "linear",
            },
          },
        })

        // Reset the position instantly
        await logoAnimation.set({ x: '0%' })

        // Recursively call animate to create an infinite loop
        animate()
      }
    }

    animate()

    // Cleanup function
    return () => {
      logoAnimation.stop()
    }
  }, [logoAnimation])
  
    return (
      <div className="relative min-h-screen bg-white">
          <Helmet>
          <title> Chika.ai | Source smarter</title>
          <meta name="description" content="Discover how Chika.ai streamlines the hiring process, connecting top talent with innovative companies through AI-powered recruitment." />
        </Helmet>
        {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>{t('welcome')}</h1>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect</span>
              <span className="block text-pink-600">Talent Match</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
              Chika.ai uses cutting-edge AI to connect you with top talent, streamlining your hiring process and ensuring the perfect fit for your team.streamlining your hiring process and ensuring the perfect fit for your team.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Button
                  onClick={isAuthenticated ? undefined : () => loginWithRedirect()}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10"
                >
                  {isAuthenticated ? 'Go to Dashboard' : t('getStarted')}
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="/features" target='_blank'>
                  <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-pink-50 md:py-4 md:text-lg md:px-10">
                    {t('scheduleDemo')}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className='mb-8 text-pink-500 text-center font-semi-bold text-xl tracking-wide'>HIRING SO SIMPLE, IT FEELS LIKE MAGIC</p>
          <h1 className='text-center text-6xl tracking-wide font-extrabold pt-8'>Meet Chika.ai</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4 tracking-wide py-8">Source smarter, hire faster</h2>
          <div className="aspect-w-16 aspect-h-9 h-[600px]">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Chika.ai Demo Video"
              className="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>

       {/* Partner Logos */}
        <section className="w-full py-12 bg-white">
          <div className="w-[60%] mx-auto relative overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8 pb-12">Connect with Talents from the worlds largest professional network</h2>
            <div className="relative opacity-50" ref={logoContainerRef}>
              <motion.div
                className="flex space-x-8"
                animate={logoAnimation}
                style={{ width: `${partnerLogos.length * 200}px` }}
              >
                {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                  <img
                    key={`${partner.name}-${index}`}
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-12 w-auto object-contain"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
            {/* Our Inpact */}
          <section className="w-full py-20 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact in Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUp 
                      end={stat.value} 
                      duration={2} // Animation duration for the counter
                      separator="," // Add commas to large numbers
                    />
                    {stat.label.startsWith("C")? "m+" : "+"}
                  </h3>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
              </div>
        </section>
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Why Choose Chika.ai?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-base text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>

                {/* Tooltip */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] w-auto p-2 rounded-md bg-gray-900 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to learn more
                </div> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedText />

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y-2 border-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            What Our Clients Say
          </h2>
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <p className="text-lg text-gray-600 mb-4">"{testimonials[currentTestimonial].content}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonials[currentTestimonial].name}`} alt={testimonials[currentTestimonial].name} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section
      <section className="py-20 bg-pink-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                <p className="text-base text-gray-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Us Section */}
      <ContactUs />

      {/* Footer */}
      </div>
    // <div className="min-h-screen bg-white">

    //   <main className="container mx-auto px-4 py-16">
    //     <section className="text-center mb-16">
    //       <h2 className="text-4xl font-bold mb-4 text-gray-800">The Modern Way to Source Top Talent</h2>
    //       <p className="text-xl text-gray-600 mb-8">Effortlessly connect with high-matching, interested candidates for your roles.</p>
    //       {isAuthenticated ? (
    //         <button size="lg" className="bg-pink-600 hover:bg-pink-700">
    //           <Link to="/profile">Go to Profile</Link>
    //         </button>
    //       ) : (
    //         <button size="lg" className="bg-pink-600 hover:bg-pink-700" onClick={() => loginWithRedirect()}>
    //           Get Started
    //         </button>
    //       )}
    //     </section>

    //     <section className="grid md:grid-cols-3 gap-8 mb-16">
    //       <div>
    //         <div className="p-6 flex flex-col items-center text-center">
    //           <FileText className="w-12 h-12 text-pink-600 mb-4" />
    //           <h3 className="text-xl font-semibold mb-2">Easy Job Description</h3>
    //           <p className="text-gray-600">Fill out a simple form to describe your ideal candidate and role requirements.</p>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="p-6 flex flex-col items-center text-center">
    //           <UserPlus className="w-12 h-12 text-pink-600 mb-4" />
    //           <h3 className="text-xl font-semibold mb-2">Continuous Matching</h3>
    //           <p className="text-gray-600">Our AI continuously presents high-matching candidates interested in your role.</p>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="p-6 flex flex-col items-center text-center">
    //           <Calendar className="w-12 h-12 text-pink-600 mb-4" />
    //           <h3 className="text-xl font-semibold mb-2">Instant Scheduling</h3>
    //           <p className="text-gray-600">Approve a candidate and a meeting is automatically set up via Calendly.</p>
    //         </div>
    //       </div>
    //     </section>

    //     <section className="bg-gray-50 rounded-lg p-8 mb-16">
    //       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">How It Works</h2>
    //       <div className="grid md:grid-cols-2 gap-8 items-center">
    //         <div>
    //           <ol className="space-y-4">
    //             <li className="flex items-center space-x-3">
    //               <CheckCircle className="w-6 h-6 text-pink-600" />
    //               <span>Fill out the job description form</span>
    //             </li>
    //             <li className="flex items-center space-x-3">
    //               <CheckCircle className="w-6 h-6 text-pink-600" />
    //               <span>Review continuously matched candidates</span>
    //             </li>
    //             <li className="flex items-center space-x-3">
    //               <CheckCircle className="w-6 h-6 text-pink-600" />
    //               <span>Approve or reject candidates with one click</span>
    //             </li>
    //             <li className="flex items-center space-x-3">
    //               <CheckCircle className="w-6 h-6 text-pink-600" />
    //               <span>Automatic meeting setup via Calendly</span>
    //             </li>
    //           </ol>
    //         </div>
    //         <div className="bg-white p-6 rounded-lg shadow-lg">
    //           <h3 className="text-xl font-semibold mb-4">Start Finding Your Perfect Candidate</h3>
    //           <form className="space-y-4">
    //             <input placeholder="Your Name" />
    //             <input placeholder="Company Name" />
    //             <input placeholder="Email Address" />
    //             <button className="w-full bg-pink-600 hover:bg-pink-700">Get Started</button>
    //           </form>
    //         </div>
    //       </div>
    //     </section>

    //     <section className="text-center">
    //       <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Transform Your Hiring Process?</h2>
    //       <p className="text-xl text-gray-600 mb-8">Join Chika.ai today and experience the future of talent sourcing.</p>
    //       <button size="lg" className="bg-pink-600 hover:bg-pink-700">Sign Up Now</button>
    //     </section>
    //   </main>
    // </div>
  )
}