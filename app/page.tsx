export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Vord
        </h1>
        <p className="text-xl text-gray-300 mt-4">
        Vord WhatsApp Bot  by Victory Lord
        </p>
        <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">
          Create, deploy, and manage powerful WhatsApp bots with ease.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-purple-500 hover:bg-purple-500/20 rounded-lg font-semibold transition">
            GitHub
          </button>
        </div>
      </div>

      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Vord Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Session Manager</h3>
              <p className="text-gray-400">Generate QR or pairing codes easily.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Plugins</h3>
              <p className="text-gray-400">Extend your bot with community plugins.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
              <p className="text-gray-400">Deploy to Heroku, Railway, Vercel.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
        <p>© 2025 Vord. Created by Victory Lord</p>
      </footer>
    </main>
  );
}