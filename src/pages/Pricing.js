import { Check } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small businesses",
      features: [
        "Up to 5 job postings",
        "Basic AI matching",
        "Email support",
        "30-day candidate history"
      ]
    },
    {
      name: "Professional",
      price: "$299",
      description: "Ideal for growing companies",
      features: [
        "Up to 20 job postings",
        "Advanced AI matching",
        "Priority email & chat support",
        "90-day candidate history",
        "Custom job branding"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited job postings",
        "Premium AI matching & insights",
        "24/7 phone & chat support",
        "Unlimited candidate history",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Choose the Right Plan for Your Needs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={index === 1 ? "border-pink-600 border-2" : ""}>
              <header>
                <h2 className="text-2xl font-bold text-center">{plan.name}</h2>
              </header>
              <div className="text-center">
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="text-left mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center mb-2">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-pink-600 hover:bg-pink-700">Get Started</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}