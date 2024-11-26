import ChatInterface from './components/ChatInterface'
import Feedback from './components/Feedback'
import SponsorButton from './components/SponsorButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Chat Assistant
          </h1>
          <p className="text-xl text-gray-600">
            与智能助手开始对话
          </p>
        </div>
        <ChatInterface />
        <Feedback />
        <SponsorButton />
      </div>
    </main>
  )
}
