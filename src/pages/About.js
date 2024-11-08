
export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">About beacon.ai</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 mb-6">
              beacon.ai is revolutionizing the way companies find and engage with top talent. Our AI-powered platform streamlines the recruitment process, saving time and resources while connecting you with the perfect candidates for your roles.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Founded by a team of HR tech experts and data scientists, we're on a mission to make hiring smarter, faster, and more efficient for businesses of all sizes.
            </p>
            <p className="text-lg text-gray-600">
              Join us in shaping the future of recruitment and experience the power of AI-driven talent sourcing.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/placeholder.svg?height=384&width=384"
              alt="Team at work"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}