import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function PaymentSuccess() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-pink-200 shadow-lg">
          <CardContent className="pt-6 pb-4 px-6 text-center">
            <CheckCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-4">
              Thank you for your payment. Your campaign is now ready to launch!
            </p>
            <div className="space-y-2 text-left">
              <p className="text-sm text-gray-500 flex items-start">
                <CheckCircle className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0" />
                Work on your campaign will start immediately.
              </p>
              <p className="text-sm text-gray-500 flex items-start">
                <CheckCircle className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0" />
                Our AI will analyze and identify high-value prospects.
              </p>
              <p className="text-sm text-gray-500 flex items-start">
                <CheckCircle className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0" />
                You'll receive notifications when potential matches are found.
              </p>
            </div>
          </CardContent>
          <CardFooter className="pb-6 px-6">
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}