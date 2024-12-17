import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Search, Mail, Calendar, ArrowRight, User, Briefcase, DollarSign, Check, X } from 'lucide-react'
import { Button } from "../components/ui/button"
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useAuth0 } from '@auth0/auth0-react';

const CreateCampaignForm = () => {
  const [formState, setFormState] = useState({ jobTitle: '', department: '', salaryRange: '' })
  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Create Campaign</h3>
      <div className="space-y-6">
        <div className="relative">
          <User className="absolute top-3 left-3 text-pink-600" />
          <input 
            type="text" 
            name="jobTitle"
            value={formState.jobTitle}
            onChange={handleInputChange}
            placeholder="Job Title" 
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition duration-200" 
          />
        </div>
        <div className="relative">
          <Briefcase className="absolute top-3 left-3 text-pink-600" />
          <input 
            type="text" 
            name="department"
            value={formState.department}
            onChange={handleInputChange}
            placeholder="Department" 
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition duration-200" 
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute top-3 left-3 text-pink-600" />
          <input 
            type="text" 
            name="salaryRange"
            value={formState.salaryRange}
            onChange={handleInputChange}
            placeholder="Salary Range" 
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition duration-200" 
          />
        </div>
      </div>
      <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg transition duration-200">
        Create Campaign
      </Button>
    </motion.div>
  )
}

const AIAnalysisVisual = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const {t} = useTranslation()
  const steps = t('howItWorks.steps.aiAnalysis.steps', {returnObjects: true});

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-8 rounded-xl shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800">AI Analysis</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: index <= currentStep ? 1 : 0.5,
              x: index === currentStep ? 10 : 0
            }}
            className="bg-white p-4 rounded-lg flex items-center justify-between"
          >
            <span className="text-gray-800">{step}</span>
            {index < currentStep && <Check className="text-green-500" />}
            {index === currentStep && <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-t-2 border-pink-500 rounded-full"
            />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const OutreachVisual = () => {
  const {t} = useTranslation()
  const [emailSent, setEmailSent] = useState(false)
  //const steps = t('howItWorks.steps.outreach.steps', {returnObjects: true});

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800">{t('howItWorks.steps.outreach.title')}</h3>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold text-gray-800"></p>
          <p className="text-sm text-gray-600">{t('howItWorks.steps.outreach.emailTemplate.subject')}</p>
          <p className="text-sm text-gray-600">Dear [Candidate Name],</p>
          <p className="text-sm text-gray-600">{t('howItWorks.steps.outreach.emailTemplate.body')}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Sent: 50</span>
          <span>Opened: 38</span>
          <span>Responded: 15</span>
        </div>
        <Button 
          onClick={() => setEmailSent(true)} 
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg transition duration-200"
        >
          Send Outreach Email
        </Button>
        <AnimatePresence>
          {emailSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Email sent successfully.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <X onClick={() => setEmailSent(false)} className="fill-current h-6 w-6 text-green-500" role="button" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const MeetingSetupVisual = () => {
  const [reminderSent, setReminderSent] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-8 rounded-xl shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Approve Candidate</h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <p className="font-semibold text-gray-800">Interview with John Doe</p>
          <p className="text-sm text-gray-600">Clients Calender Link</p>
          <p className="text-sm text-gray-600">Company Name | Job Position Interview </p>
          <p className="text-sm text-gray-600">Status: Confirmed</p>
        </div>
        <Button 
          onClick={() => setReminderSent(true)}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg transition duration-200"
        >
          Send Reminder
        </Button>
        <AnimatePresence>
          {reminderSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Reminder Sent!</strong>
              <span className="block sm:inline"> The candidate has been notified.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <X onClick={() => setReminderSent(false)} className="fill-current h-6 w-6 text-blue-500" role="button" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


const StepIndicator = ({number }) => (
  <div className="absolute top-6 left-9 -mt-6 -ml-6 bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
    {number}
  </div>
)

export default function HowItWorks() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const { t } = useTranslation();

  const steps = [
    {
      icon: <FileText className="h-16 w-16 text-pink-600" aria-hidden="true" />,
      title: 'Create Campaign',
      description: 'howItWorks.steps.createCampaign.description',
      details: t('howItWorks.steps.createCampaign.details', { returnObjects: true }),
      visual: <CreateCampaignForm />
    },
    {
      icon: <Search className="h-16 w-16 text-pink-600" aria-hidden="true" />,
      title: t('howItWorks.steps.aiAnalysis.title'),
      description: t('howItWorks.steps.aiAnalysis.description'),
      details: t('howItWorks.steps.aiAnalysis.details', { returnObjects: true }),
      visual: <AIAnalysisVisual />
    },
    {
      icon: <Mail className="h-16 w-16 text-pink-600" aria-hidden="true" />,
      title: t('howItWorks.steps.outreach.title'),
      description: t('howItWorks.steps.outreach.description'),
      details: t('howItWorks.steps.outreach.details', { returnObjects: true }),
      visual: <OutreachVisual />
    },
    {
      icon: <Calendar className="h-16 w-16 text-pink-600" aria-hidden="true" />,
      title: t('howItWorks.steps.meetingSetup.title'),
      description: t('howItWorks.steps.meetingSetup.description'),
      details: t('howItWorks.steps.meetingSetup.details', { returnObjects: true }),
      visual: <MeetingSetupVisual />
    }
  ]
  return (
    <>
      <Helmet>
        <title>How Chika.ai Works | Streamlined Hiring Process</title>
        <meta name="description" content="Discover how Chika.ai streamlines the hiring process, connecting top talent with innovative companies through AI-powered recruitment." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <main className="pt-16 pb-20">
          <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
              >
               {t('howItWorks.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-8 md:max-w-3xl"
              >
                  {t('howItWorks.intro')}
              </motion.p>
            </div>
          </section>

          {steps.map((step, index) => (
            <section id={step.title.toLowerCase().replace(" ", "-")} key={step.title} className="w-full py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col lg:flex-row items-center bg-white rounded-2xl shadow-xl overflow-hidden relative"
                >
                  <StepIndicator number={index + 1} />
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex justify-center lg:justify-start mb-6">
                      {step.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h2>
                    <p className="text-xl text-gray-600 mb-6">{t(step.description)}</p>
                    <ul className="space-y-4" aria-label={`Details for ${step.title}`}>
                      {(step.details).map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <ArrowRight className="h-6 w-6 text-pink-500 mr-2 mt-1 flex-shrink-0" aria-hidden="true" />
                          <span className="text-lg text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50">
                    {step.visual}
                  </div>
                </motion.div>
              </div>
            </section>
          ))}

          <section className="w-full bg-pink-600 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold text-white mb-8"
              >
                {t('howItWorks.cta.title')}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* <Link to="/profile"> */}
                  <Button onClick={isAuthenticated ? undefined : () => loginWithRedirect()} size="lg" variant="secondary" className="text-pink-600 bg-white hover:bg-gray-100 text-lg px-8 py-4 rounded-full transition duration-300 transform hover:scale-105">
                  {t('howItWorks.cta.button')}
                  </Button>
                {/* </Link> */}
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}