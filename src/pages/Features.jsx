import { CheckCircle, Zap, Target, Clock, Shield, Sparkles } from "lucide-react"

export default function Features() {
  const features = [
    { icon: CheckCircle, title: "Smart Matching", description: "AI-powered candidate matching based on skills, experience, and cultural fit." },
    { icon: Zap, title: "Instant Connections", description: "Connect with interested candidates immediately, no more waiting for responses." },
    { icon: Target, title: "Precision Targeting", description: "Reach out to candidates who are actively seeking opportunities like yours." },
    { icon: Clock, title: "Time-Saving", description: "Reduce time-to-hire with our streamlined, automated processes." },
    { icon: Shield, title: "Data Security", description: "Enterprise-grade security to protect your data and candidates' information." },
    { icon: Sparkles, title: "Continuous Learning", description: "Our AI improves with each interaction, providing better matches over time." },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Features that Set Us Apart</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="p-6 flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}