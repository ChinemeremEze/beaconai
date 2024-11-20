import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useToast } from "@/hooks/use-toast"

export default function ContactUs() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (honeypot) {
      // If the honeypot field is filled, silently reject the submission
      console.log('Bot detected')
      return
    }

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha('contact_form')

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, token }),
      })

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "We've received your message and will get back to you soon.",
        })
        setName('')
        setEmail('')
        setMessage('')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-700 text-lg">*</span></label>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              required 
              className="mt-1" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-700 text-lg">*</span></label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="mt-1" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message <span className="text-red-700 text-lg">*</span></label>
            <Textarea 
              id="message" 
              name="message" 
              rows={4} 
              required 
              className="mt-1" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div style={{ display: 'none' }}>
            <label htmlFor="honeypot">Leave this field empty</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white">Send Message</Button>
          </div>
        </form>
      </div>
    </section>
  )
}